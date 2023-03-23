import User from "../models/user";
import { Request, Response } from "express";

//DB TEST:
// User.insertMany(new User({
//   "name": "John",
//   "surname": "Doe",
//   "username": "jd",
//   "email": "jd@asd.com",
//   "password": "123123",
//   "level": "intermediate"
// }));

exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    let allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.json(err).status(500);
  }
};

exports.createUser = async (req: Request, res: Response) => {
  try {
    let user = await User.create(req.body);
    console.log("User created", user);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(403).json(err.message);
  }
};

exports.getUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const existingUser = await User.find({ email: email });
    if (!existingUser) {
      throw new Error("User not found");
    }
    res.json(existingUser).status(200);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

exports.editUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    req.body = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json(`User with id:${id} was successfully updated.`);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

exports.deleteUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    req.body = await User.deleteOne({ _id: id });
    res.status(200).json(`User with id:${id} was successfully deleted.`);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
