import { client } from "../db/dbConfig.js";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { generateToken } from "../utils/GenerateAccessToken.js";

const LoginController = async(request, response) => {

    const email = request.body.email;
    const password = request.body.password;

    const params = {
        TableName: process.env.B2P_TEACHERS_AUTH_DYNAMO_TABLE,
    };

    try{
        const command = new ScanCommand(params);
        const db_response = await client.send(command);
        
        const user = db_response.Items.find(
            item => item.email === email && item.password === password
        );
        
        if(user){
            const token = await generateToken(user);
            response.status(200).json({token: token});
        }else{
            response.status(404).json({message: "user not found"});
        };
    

    }catch(error){
        response.status(500).json({message: error.message});
    };
};

const StudentLoginController = async(request, response) => {

    try{
        const email = request.body.email;
        const password = request.body.password;

        const params = {
            TableName: process.env.B2P_STUDENT_AUTH_DYNAMO_TABLE,
        };

        const command = new ScanCommand(params);
        const db_response = await client.send(command);

        const user = db_response.Items.find(
            item => item.email === email && item.password === password
        );
        
        if(user){
            if(!user.isActive){
                return response.status(409).json({message: "Access Had Been Blocked Contact Admin"});
            }

            const token_body = {
                student_id: user.student_id,
            }
            const token = await generateToken(token_body);
            response.status(200).json({token: token});
        }else{
            response.status(404).json({message: "user not found"});
        };


    }catch(error){
        response.status(500).json({message: error.message});
    };
};



export {LoginController, StudentLoginController};