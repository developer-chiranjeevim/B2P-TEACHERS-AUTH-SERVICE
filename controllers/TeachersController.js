import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../db/dbConfig.js";


const TeachersController = async(request, response) => {

    const params = {
        TableName: process.env.B2P_TEACHERS_AUTH_DYNAMO_TABLE
    }

    try{

        const DBResponse = await client.send(new ScanCommand(params));

        const teachers = DBResponse.Items.filter((item) => item.role["S"] != "admin");
        const filteredResponse = teachers.map(({user_id, email}) => [user_id, email]);
        response.status(200).json({teachers: filteredResponse});


    }catch(error){
        response.status(500).json({message: error.message});
    };
};



export {TeachersController};