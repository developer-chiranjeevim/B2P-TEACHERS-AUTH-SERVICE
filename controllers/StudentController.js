import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../db/dbConfig.js";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const FetchAllStudentsNames = async(request, response) => {

    const params = {
        TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE
    }

    try{
        const DBResponse = await client.send(new ScanCommand(params));

        const students = DBResponse.Items.map(item => ({
            user_id: item.student_id.S,
            user_name: item.datas.M.firstName.S,
            email: item.datas.M.email.S
        }));
        
        response.status(200).json({students: students});

    }catch(error){
        response.status(500).json({message: error.message});
    };
};


const FetchAllStudentDetails = async(request, response) => {
    
    const params = {
        TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE
    }

    try{
        const DBResponse = await client.send(new ScanCommand(params));

       
        const students = DBResponse.Items.map(item => unmarshall(item));

        response.status(200).json({students});

    }catch(error){
        response.status(500).json({message: error.message});
    };
};

const updateStudentActiveStatus = async(request, response) => {

    console.log(request.body);
    
    const student_id = request.body.student_id;
    const isActive = request.body.isActive;

    // Validate inputs
    if (!student_id) {
        return response.status(400).json({ message: "student_id is required" });
    }

    if (typeof isActive !== 'boolean') {
        return response.status(400).json({ message: "isActive must be a boolean value" });
    }

    const params = {
        TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE,
        Key: {
            student_id: student_id
        },
        UpdateExpression: "SET datas.isActive = :isActive",  // Updated path
        ExpressionAttributeValues: {
            ":isActive": isActive
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const DBResponse = await client.send(new UpdateCommand(params));

        response.status(200).json({
            message: "Student active status updated successfully",
            student: DBResponse.Attributes
        });

    } catch(error) {
        console.error("DynamoDB Error:", error);
        response.status(500).json({ message: error.message });
    };
};



export {FetchAllStudentsNames, FetchAllStudentDetails, updateStudentActiveStatus};