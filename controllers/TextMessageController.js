import twilio from "twilio";
import dotenv from "dotenv";

// Initialize dotenv to read the .env file
dotenv.config();

// Initialize Twilio with the corrected environment variable names
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
);


const sendTextMessage = async (request, response) => {
    console.log(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
    try {
        // 1. Extract data from request body
        const { name, time, meetingLink, phoneNumber } = request.body;

        // 2. Validate required fields
        if (!name || !time || !meetingLink || !phoneNumber) {
            return response.status(400).json({
                success: false,
                message: 'Missing required fields',
                required: ['name', 'time', 'meetingLink', 'phoneNumber']
            });
        }

        // 3. Format phone number for India (+91)
        let formattedPhone = phoneNumber.toString().trim().replace(/[\s\-\(\)]/g, '');

        if (!formattedPhone.startsWith('+')) {
            if (formattedPhone.startsWith('91')) {
                formattedPhone = '+' + formattedPhone;
            } else {
                formattedPhone = '+91' + formattedPhone;
            }
        }

        // 4. Validate Indian phone number format
        const phoneRegex = /^\+91[6-9]\d{9}$/;
        if (!phoneRegex.test(formattedPhone)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid Indian phone number. Must be 10 digits.'
            });
        }

        // 5. Compose the message
        const messageContent = `Hello ${name},\n\nFrom B2P Teachers\n\nYour meeting is scheduled for ${time}.\n\nJoin here: ${meetingLink}`;

        // 6. Send SMS via Twilio
        const twilioResponse = await twilioClient.messages.create({
            body: messageContent,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhone
        });

        // 7. Success Response
        return response.status(200).json({
            success: true,
            message: 'Text message sent successfully',
            data: {
                messageSid: twilioResponse.sid,
                status: twilioResponse.status,
                recipient: formattedPhone
            }
        });

    } catch (error) {
        console.error("Twilio Error Details:", error);
        
        // Return Twilio specific error if available, else generic 500
        return response.status(error.status || 500).json({
            success: false,
            message: error.message,
            code: error.code // Useful for debugging (e.g., 21608 for unverified numbers)
        });
    }
};

export { sendTextMessage };