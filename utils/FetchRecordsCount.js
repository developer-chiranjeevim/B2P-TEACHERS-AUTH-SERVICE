import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../db/dbConfig.js";

const fetchStudentsCount = async() => {

    try{
        const cmd = new ScanCommand({
            TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE,
            Select: "COUNT"
        });

        let total = 0;
        let lastKey;

        do{
            const res = await client.send(cmd);
            total += res.Count;
            lastKey = res.LastEvaluatedKey;
            cmd.input.ExclusiveStartKey = lastKey;
        }while (lastKey);

        return total;

    }catch(error){
        console.log(error.message);
        return -1;
    };
};

const CheckEmailAlreadyExists = async(email) => {
    
    const params = {
        TableName: process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE
    };

    
    
    try{
    const DBResponse = await client.send(new ScanCommand(params));
    const exists = DBResponse.Items.filter((item) => {
        return item.email["S"] === email

    });
    console.log(exists);
    if(exists.length !== 0){
        return true;
    }else{
        return false;
    };

    }catch(error){
        console.log(error);
        return -1;
    };
};




export {fetchStudentsCount, CheckEmailAlreadyExists};