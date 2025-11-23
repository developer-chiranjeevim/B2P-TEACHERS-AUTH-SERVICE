import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const rootPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: rootPath });

const sendStudentOTP = async(email, password) => {
    try{
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: 'chiranjeevim2004@gmail.com',
            from: 'noreply@b2pteachers.com', 
            subject: 'Welcome to B2P Teachers - Your Account Details',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Welcome to B2P Teachers!</h2>
                    
                    <p>Dear User,</p>
                    
                    <p>Thank you for registering with B2P Teachers. Your account has been successfully created.</p>
                    
                    <p>Here are your login credentials:</p>
                    
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 10px 0;">Email: <strong>${email}</strong></p>
                        <p style="margin: 10px 0;">Password: <strong>${password}</strong></p>
                    </div>
                    
                    <p style="color: #d9534f; font-weight: bold;">⚠️ Important Security Notice:</p>
                    <p>Please do not share your login credentials with anyone else. Keep this information secure and confidential.</p>
                    
                    <p>We recommend changing your password after your first login for added security.</p>
                    
                    <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                    
                    <p>Best regards,<br>
                    <strong>B2P Teachers Team</strong></p>
                </div>
            `,
        };

        await sgMail.send(msg);
        console.log("sent")
        return true;
    }catch(error){
        return false;
        console.log(error.message)
    };
};


export {sendStudentOTP};


