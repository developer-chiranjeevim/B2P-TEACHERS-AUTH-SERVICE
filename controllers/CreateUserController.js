import { client } from "../db/dbConfig.js";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const createUser = async(request, response) => {

    if(request.token.id.role !== "admin"){
        return response.status(401).json({message: "unauthorized"});
    };


    const params = {
        TableName: process.env.B2P_TEACHERS_AUTH_DYNAMO_TABLE,
        Item:request.body
    };

    try{
        await client.send(new PutCommand(params));
        response.status(200).json({message: "user create successfully"});

    }catch(error){
        response.status(500).json({message: error.message});
    };
};



export {createUser};