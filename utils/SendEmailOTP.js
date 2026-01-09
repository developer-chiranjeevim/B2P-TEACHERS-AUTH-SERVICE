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
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td align="center" style="padding: 40px 20px;">
                                <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to B2P Teachers!</h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">Dear User,</p>
                                            
                                            <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                                                Thank you for registering with B2P Teachers. Your account has been successfully created and is ready to use!
                                            </p>
                                            
                                            <h3 style="margin: 0 0 15px; color: #333333; font-size: 18px; font-weight: 600;">Your Login Credentials</h3>
                                            
                                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 25px;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <table role="presentation" style="width: 100%;">
                                                            <tr>
                                                                <td style="padding: 8px 0;">
                                                                    <span style="color: #666666; font-size: 14px;">Email:</span>
                                                                </td>
                                                                <td style="padding: 8px 0; text-align: right;">
                                                                    <strong style="color: #333333; font-size: 15px;">${email}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                                                                    <span style="color: #666666; font-size: 14px;">Password:</span>
                                                                </td>
                                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #e0e0e0;">
                                                                    <strong style="color: #333333; font-size: 15px; font-family: 'Courier New', monospace;">${password}</strong>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <h3 style="margin: 0 0 15px; color: #333333; font-size: 18px; font-weight: 600;">Access Your Dashboard</h3>
                                            
                                            <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                                                <tr>
                                                    <td style="padding: 0 10px 15px 0; width: 50%; vertical-align: top;">
                                                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; text-align: center;">
                                                            <p style="margin: 0 0 8px; color: rgba(255,255,255,0.9); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Student Portal</p>
                                                            <a href="https://student.b2pteachers.com" style="color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none;">student.b2pteachers.com</a>
                                                        </div>
                                                    </td>
                                                    <td style="padding: 0 0 15px 10px; width: 50%; vertical-align: top;">
                                                        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 8px; text-align: center;">
                                                            <p style="margin: 0 0 8px; color: rgba(255,255,255,0.9); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Parents Portal</p>
                                                            <a href="https://parents.b2pteachers.com" style="color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none;">parents.b2pteachers.com</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- Security Notice -->
                                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; border-radius: 4px; margin-bottom: 30px;">
                                                <p style="margin: 0 0 10px; color: #856404; font-size: 15px; font-weight: 600;">
                                                    🔒 Important Security Notice
                                                </p>
                                                <ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.6;">
                                                    <li>Do not share your login credentials with anyone</li>
                                                    <li>Change your password after your first login</li>
                                                    <li>Keep this information secure and confidential</li>
                                                </ul>
                                            </div>
                                            
                                            <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                                If you have any questions or need assistance, feel free to contact our support team.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; text-align: center;">
                                            <p style="margin: 0 0 10px; color: #333333; font-size: 16px; font-weight: 600;">Best regards,</p>
                                            <p style="margin: 0 0 20px; color: #667eea; font-size: 18px; font-weight: 700;">B2P Teachers Team</p>
                                            <p style="margin: 0; color: #999999; font-size: 13px;">
                                                © 2024 B2P Teachers. All rights reserved.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };

        await sgMail.send(msg);
        console.log("Student email sent successfully");
        return true;
    }catch(error){
        console.log("Error sending student email:", error.message);
        return false;
    };
};

const sendTeacherOTP = async(email, password, name) => {
    try {
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: email,
            from: 'noreply@b2pteachers.com', 
            subject: '🎉 Account Approved - Welcome to B2P Teachers!',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td align="center" style="padding: 40px 20px;">
                                <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
                                            <div style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                                                <span style="font-size: 48px;">🎉</span>
                                            </div>
                                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Congratulations!</h1>
                                            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.95); font-size: 18px;">Your Account Has Been Approved</p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
                                            
                                            <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                                                Great news! Your B2P Teachers account has been approved and is now active. We're excited to have you join our community of educators!
                                            </p>
                                            
                                            <!-- Success Badge -->
                                            <div style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-left: 4px solid #28a745; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
                                                <p style="margin: 0; color: #155724; font-size: 18px; font-weight: 600;">
                                                    ✅ Your account is ready to use!
                                                </p>
                                            </div>
                                            
                                            <h3 style="margin: 0 0 15px; color: #333333; font-size: 18px; font-weight: 600;">Your Login Credentials</h3>
                                            
                                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 30px;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <table role="presentation" style="width: 100%;">
                                                            <tr>
                                                                <td style="padding: 8px 0;">
                                                                    <span style="color: #666666; font-size: 14px;">Email:</span>
                                                                </td>
                                                                <td style="padding: 8px 0; text-align: right;">
                                                                    <strong style="color: #333333; font-size: 15px;">${email}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                                                                    <span style="color: #666666; font-size: 14px;">Password:</span>
                                                                </td>
                                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #e0e0e0;">
                                                                    <strong style="color: #333333; font-size: 15px; font-family: 'Courier New', monospace;">${password}</strong>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- CTA Button -->
                                            <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                                                <tr>
                                                    <td align="center">
                                                        <a href="https://teachers.b2pteachers.com" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                                            Access Teacher Dashboard
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- Security Notice -->
                                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; border-radius: 4px; margin-bottom: 30px;">
                                                <p style="margin: 0 0 10px; color: #856404; font-size: 15px; font-weight: 600;">
                                                    🔒 Important Security Notice
                                                </p>
                                                <ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.6;">
                                                    <li>Do not share your login credentials with anyone</li>
                                                    <li>Change your password after your first login</li>
                                                    <li>Keep this information secure and confidential</li>
                                                </ul>
                                            </div>
                                            
                                            <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                                If you have any questions or need assistance, feel free to contact our support team. We're here to help you succeed!
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; text-align: center;">
                                            <p style="margin: 0 0 10px; color: #333333; font-size: 16px; font-weight: 600;">Best regards,</p>
                                            <p style="margin: 0 0 20px; color: #11998e; font-size: 18px; font-weight: 700;">B2P Teachers Team</p>
                                            <p style="margin: 0; color: #999999; font-size: 13px;">
                                                © 2024 B2P Teachers. All rights reserved.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
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