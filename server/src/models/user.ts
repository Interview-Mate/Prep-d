 import {mongoose} from './index.models';
 //import { Schema, Document, Model, model } from "mongoose";
 //import { IUser } from '../types';
//  const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
export default User;