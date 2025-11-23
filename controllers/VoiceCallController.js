import { client } from "../db/dbConfig.js";
import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import sendVoiceCall from "../utils/VoiceMail.js";

const VoiceCallController = async(request, response) => { 


  const params = { 
    TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE 
  };

  const { message } = request.body;
  console.log(message);
  
  try {
    // client.send(new ScanCommand(...)) now returns unmarshalled items
    const DBResponse = await client.send(new ScanCommand(params)); 
    
    // NO unmarshall needed here!
    const students = DBResponse.Items.map(item => `+91${item.phone}`); 
    students.map((student) => {
        sendVoiceCall(student, message);
    });
    
    response.status(200).json({students: students}); 
  } catch(error) { 
    console.error("Error fetching students:", error);
    response.status(500).json({message: error.message}); 
  }
};


export {VoiceCallController};