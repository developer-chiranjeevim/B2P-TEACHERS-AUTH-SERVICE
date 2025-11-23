import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"; 
import dotenv from "dotenv";

dotenv.config();

// 1. Initialize the low-level client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// 2. Create the Document Client wrapper
const docClient = DynamoDBDocumentClient.from(client); 

// 3. Export the Document Client
export { docClient as client }; 