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



const CheckEmailAlreadyExists = async (email) => {
    
    const TableName = process.env.B2P_TEACHERS_STUDENT_AUTH_TABLE;

    // Use ScanCommand because 'email' is not the Partition Key (student_id is).
    // The FilterExpression tells DynamoDB to perform the filtering server-side.
    const params = {
        TableName: TableName,
        FilterExpression: '#e = :e_val', // Use an Expression Attribute Name for 'email'
        ExpressionAttributeNames: {
            '#e': 'email' // Mapping to avoid conflicts with reserved words
        },
        ExpressionAttributeValues: {
            // Must specify the data type: { S: 'value' } for String
            ':e_val': { S: email }, 
        },
        ProjectionExpression: 'student_id', // Only retrieve the Partition Key to save read capacity
        Limit: 1, // Crucially, stop searching after the first match is found
        ConsistentRead: false, // Generally set to false (Eventual Consistency) to save cost
    };

    try {
        const DBResponse = await client.send(new ScanCommand(params));
        
        console.log(`Scan found ${DBResponse.Items.length} item(s) with email: ${email}`);

        // If the server returns at least one item (Limit: 1), the email exists.
        return DBResponse.Items.length > 0;

    } catch (error) {
        console.error("Error checking email:", error);
        throw error;
    }
};




export {fetchStudentsCount, CheckEmailAlreadyExists};