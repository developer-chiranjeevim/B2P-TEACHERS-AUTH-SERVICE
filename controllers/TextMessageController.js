import twillo from "twilio";

const twilioClient = twillo(
    process.env.VOICE_SID ,
    process.env.VOICE_AUTH_TOKEN
);

const sendTextMessage = async(request, response) => {
    try{
        // Extract data from request body
        const { name, time, meetingLink, phoneNumber } = request.body;
        
        // Validate required fields
        if (!name || !time || !meetingLink || !phoneNumber) {
            return response.status(400).json({
                message: 'Missing required fields',
                required: ['name', 'time', 'meetingLink', 'phoneNumber']
            });
        }
        
        // Format phone number - add +91 if not present
        let formattedPhone = phoneNumber.toString().trim();
        
        // Remove any spaces, dashes, or parentheses
        formattedPhone = formattedPhone.replace(/[\s\-\(\)]/g, '');
        
        // If phone number doesn't start with +, add +91
        if (!formattedPhone.startsWith('+')) {
            // If it starts with 91, just add +
            if (formattedPhone.startsWith('91')) {
                formattedPhone = '+' + formattedPhone;
            } else {
                // Otherwise add +91
                formattedPhone = '+91' + formattedPhone;
            }
        }
        
        // Validate the formatted phone number (should be +91 followed by 10 digits)
        const phoneRegex = /^\+91[6-9]\d{9}$/;
        if (!phoneRegex.test(formattedPhone)) {
            return response.status(400).json({
                message: 'Invalid Indian phone number. Must be a valid 10-digit mobile number'
            });
        }
        
        // Compose the message
        const message = `Hello ${name},\n\n From B2P Teachers \n\n Your meeting is scheduled for ${time}.\n\nJoin here: ${meetingLink}\n\nContact: ${phoneNumber}`;
        
        // Send SMS via Twilio
        const twilioMessage = await twilioClient.messages.create({
            body: message,
            from: "+19789694985", // Your Twilio phone number
            to: formattedPhone
        });
        
        // Return success response
        response.status(200).json({
            success: true,
            message: 'Text message sent successfully',
            data: {
                name,
                time,
                meetingLink,
                phoneNumber: formattedPhone,
                messageContent: message,
                messageSid: twilioMessage.sid,
                status: twilioMessage.status
            }
        });
        
    }catch(error){
        response.status(500).json({message: error.message});
    };
};


export {sendTextMessage}