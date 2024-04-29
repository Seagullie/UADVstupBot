import { config } from "dotenv"
config()

export const HANDLE = process.env.HANDLE
export const TOKEN = process.env.TOKEN

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

export const IS_IN_PROD = process.env.NODE_ENV === "production"
