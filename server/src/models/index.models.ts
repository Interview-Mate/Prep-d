import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/prep-d';

const dbConnection = mongoose.connect(`${dbURL}`, {});

export {mongoose, dbConnection};
