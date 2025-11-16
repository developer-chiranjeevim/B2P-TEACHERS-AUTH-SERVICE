import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../db/dbConfig.js";



const FetchAllStudents = async(request, response) => {

    const params = {
        TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE
    }

    try{
        const DBResponse = await client.send(new ScanCommand(params));

        const names = DBResponse.Items.map(item => [
            item.name["S"],
            item.student_id["S"]
        ]);
        

        response.status(200).json({students: names});

        

    }catch(error){
        response.status(500).json({message: error.message});
    };
};



export {FetchAllStudents};