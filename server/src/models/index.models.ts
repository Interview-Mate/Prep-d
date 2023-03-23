import mongoose from 'mongoose';
require('dotenv').config();

const dbName = process.env.DB_TEST || 'interview_mate';
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

const dbConnection = mongoose.connect(`${dbURL}/${dbName}`, {});

export {mongoose, dbConnection};
