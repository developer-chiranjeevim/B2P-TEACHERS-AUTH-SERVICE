import { client } from "../db/dbConfig.js";
import { PutCommand} from "@aws-sdk/lib-dynamodb";
import { fetchStudentsCount, CheckEmailAlreadyExists } from "../utils/FetchRecordsCount.js";

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

const createStudentUser = async(request, response) => {

    const docCount = await fetchStudentsCount();
    const emailExists = await CheckEmailAlreadyExists(request.body.email);

    if(docCount === -1){
        return response.status(500).json({message: "Cannout Able to fetch existing student count inorder to generate ID"});
    }

    if(emailExists){
        return response.status(409).json({message: "User With The Following Email Already Exists"});
    }

    request.body.student_id =  `STU${docCount + 1}`;
    request.body.isActive = true;

    const params = {
        TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE,
        Item:request.body
    };

    try{

        await client.send(new PutCommand(params));
        response.status(200).json({message: "student user create successfully"});

    }catch(error){
        response.status(500).json({message: error.message});
    };
};





export {createUser, createStudentUser};