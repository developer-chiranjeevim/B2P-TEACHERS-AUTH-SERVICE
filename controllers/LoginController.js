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

        const token = await generateToken(user);

        response.status(200).json({token: token});

    }catch(error){
        response.status(500).json({message: error.message});
    };
};


export default LoginController;