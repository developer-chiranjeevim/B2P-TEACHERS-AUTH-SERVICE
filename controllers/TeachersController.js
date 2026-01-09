import { ScanCommand, DeleteItemCommand} from "@aws-sdk/client-dynamodb";
import { client } from "../db/dbConfig.js";
import { sendTeacherOTP } from "../utils/SendEmailOTP.js";


const TeachersController = async(request, response) => {

    const params = {
        TableName: process.env.B2P_TEACHERS_AUTH_DYNAMO_TABLE
    }

    try{

        const DBResponse = await client.send(new ScanCommand(params));

        const teachers = DBResponse.Items.filter((item) => item.role["S"] != "admin");
        const filteredResponse = teachers.map((item) => ({
            user_id: item.user_id.S,
            email: item.email.S,
            user_name: item.user_name.S
        }));
        response.status(200).json({teachers: filteredResponse});


    }catch(error){
        response.status(500).json({message: error.message});
    };
};


const sendTeacherApproval = async(request, response) => {
    try{
        const {email, password, name} = request.body;
        const opt_response = sendTeacherOTP(email, password, name);
        if(opt_response){
            response.status(200).json({message: "OTP SENT"});
        }else{
            response.status(500).json({message: "OTP NOT SENT"});
        };

    }catch(error){
        response.status(500).json({message: error.message});
    };
};


const deleteTeacher = async(request, response) => {
    const { user_id } = request.body;
    try {
        const params = {
            TableName: process.env.B2P_TEACHERS_AUTH_DYNAMO_TABLE,
            Key: { 
                user_id: { S: user_id } // You MUST include the { S: } here
            }
        };

        await client.send(new DeleteItemCommand(params));
        response.status(200).json({message: "Teacher deleted successfully"});
    } catch(error) {
        response.status(500).json({message: error.message});
    }
};


export {TeachersController, sendTeacherApproval, deleteTeacher};