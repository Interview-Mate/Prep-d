 //@ts-nocheck
import * as request from 'supertest';
import { app } from '../index';
import User from '../models/user';
import { Request, Response } from 'express';
import { createUser, getAllUsers, getUser, deleteUser, editUser } from '../controllers/user.controller';
