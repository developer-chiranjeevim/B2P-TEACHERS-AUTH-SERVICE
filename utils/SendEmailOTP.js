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
            to: email,
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

                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 10px 0;">Student Dashboard: <strong>student.b2pteachers.com</strong></p>
                        <p style="margin: 10px 0;">Parents Dashboard: <strong>teachers.b2pteachers.com</strong></p>
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

const sendTeacherOTP = async(email, password, name) => {
    console.log("here")
     try {
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: email,
            from: 'noreply@b2pteachers.com', 
            subject: 'Account Approved - Welcome to B2P Teachers!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #28a745;">🎉 Congratulations! Your Account Has Been Approved</h2>
                    
                    <p>Dear ${name},</p>
                    
                    <p>Great news! Your B2P Teachers account has been approved and is now active.</p>
                    
                    <div style="background-color: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
                        <p style="margin: 0; color: #155724;">
                            <strong>✅ Your account is ready to use!</strong>
                        </p>
                    </div>
                    
                    <p>Here are your login credentials:</p>
                    
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 10px 0;">Email: <strong>${email}</strong></p>
                        <p style="margin: 10px 0;">Password: <strong>${password}</strong></p>
                    </div>
                    
                    <p style="color: #d9534f; font-weight: bold;">⚠️ Important Security Notice:</p>
                    <ul style="line-height: 1.8; color: #666;">
                        <li>Please do not share your login credentials with anyone</li>
                        <li>We strongly recommend changing your password after your first login</li>
                        <li>Keep this information secure and confidential</li>
                    </ul>
                    
                    <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                    
                    <p>We're excited to have you on board!</p>
                    
                    <p>Best regards,<br>
                    <strong>B2P Teachers Team</strong></p>
                </div>
            `,
        };

        await sgMail.send(msg);
        console.log("Teacher approval email sent to:", email);
        return true;
    } catch(error) {
        console.log("Error sending approval email:", error.message);
        return false;
    }
}


export {sendStudentOTP, sendTeacherOTP};


