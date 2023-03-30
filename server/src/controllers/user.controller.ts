import User from '../models/user';
import { Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    let allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  //TODO ERROR ?? //409
  try {
    const user = await User.create(req.body);
    console.log('User created', user);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const existingUser = await User.find({ email: email });
    if (!existingUser) {
      throw new Error('User not found');
    }
    res.status(200).json(existingUser);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const user = await User.deleteOne({ _id: id });
    res.status(200).json(`User with id:${id} was successfully deleted.`);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};


export {createUser, getAllUsers, getUser, deleteUser, editUser}