import twilio from 'twilio';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const rootPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: rootPath });

const client = twilio(
    process.env.VOICE_SID,
    process.env.VOICE_AUTH_TOKEN
);


const sendVoiceMessage = async (toPhoneNumber, message) => {
    try {
        const call = await client.calls.create({
            from: process.env.PHONE_NUMBER,
            to: toPhoneNumber,
            twiml: `
                <Response>
                    <Say voice="alice" language="en-US">
                        ${message}
                    </Say>
                </Response>
            `
        });

        console.log('Voice call initiated:', call.sid);
        return {
            success: true,
            callSid: call.sid,
            status: call.status
        };
    } catch (error) {
        console.error('Error sending voice message:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
};

export default sendVoiceMessage;