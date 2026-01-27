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
        console.log("trigger")

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