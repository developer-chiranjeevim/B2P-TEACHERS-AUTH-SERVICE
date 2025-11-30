
import { client } from "../db/dbConfig.js";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";


const FetchAllStudentsNames = async(request, response) => { 
  const params = { 
    TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE 
  };
  
  try {
    // client.send(new ScanCommand(...)) now returns unmarshalled items
    const DBResponse = await client.send(new ScanCommand(params)); 
    
    // NO unmarshall needed here!
    const students = DBResponse.Items
    .filter(item => item.availStatus) // Only include items where availStatus is true
    .map(item => ({
      user_id: item.student_id,
      user_name: item.firstName,
      email: item.email
    }));
    
    response.status(200).json({students: students}); 
  } catch(error) { 
    console.error("Error fetching students:", error);
    response.status(500).json({message: error.message}); 
  }
};


const FetchAllStudentDetails = async(request, response) => {
    
  const params = {
    TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE
  };

  try {
    const DBResponse = await client.send(new ScanCommand(params));

    if (!DBResponse.Items) {
      return response.status(200).json({students: []});
    }

    // FIX: Items are already unmarshalled, no need to call unmarshall()
    const students = DBResponse.Items;

    response.status(200).json({students});

  } catch(error) {
    console.error("Error fetching student details:", error);
    response.status(500).json({message: error.message});
  }
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
        UpdateExpression: "SET isActive = :isActive",  // Updated path
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


const updateStudentAvailStatus = async(request, response) => {

  const student_id = request.body.student_id;
  if (!student_id) {
      return response.status(400).json({ message: "student_id is required" });
  };

  const params = {
    TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE,
    Key: { student_id: student_id },
    UpdateExpression: "SET availStatus = :availStatus",
    ExpressionAttributeValues: {
      ":availStatus": true  // Add the colon prefix here
    },
    ReturnValues: "ALL_NEW"
  };

  try{

    const DBResponse = await client.send(new UpdateCommand(params));

    response.status(200).json({
      message: "Student active status updated successfully",
      student: DBResponse.Attributes
    });


  }catch(error){
    response.status(500).json({message: error.message});
  };
};



export {FetchAllStudentsNames, FetchAllStudentDetails, updateStudentActiveStatus, updateStudentAvailStatus};