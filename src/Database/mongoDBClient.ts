import { MongoClient, ServerApiVersion } from "mongodb"
import { MONGODB_CONNECTION_STRING } from "../Constants/Constants"

// Replace the placeholder with your Atlas connection string
const uri = MONGODB_CONNECTION_STRING
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const MONGO_CLIENT = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

// Database and collection names
export const DB_NAME = "qna" // Update with your database name
export const COLLECTION_NAME = "questions-and-answers" // Update with your collection name
