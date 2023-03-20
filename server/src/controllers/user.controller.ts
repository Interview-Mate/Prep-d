import User from '../models/user';
import { Request, Response } from "express";

//DB TEST:
// User.insertMany(new User({
//   "name": "John",
//   "surname": "Doe",
//   "username": "jd",
//   "email": "jd@asd.com",
//   "password": "123123",
//   "level": "begginer"
// }));

exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    let allUsers = await User.find();
    return res
      .status(200)
      .json(allUsers);
  } catch (err) {
    console.log(err);
    return res
      .json(err)
      .status(500);
  }
};

exports.createUser = async (req: Request, res: Response)=> {
  try {
    let user = await User.create(
      {
        name:  req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level,
      });
      console.log('User created');
      return res
        .status(201)
        .json(user);
    } catch (err: any) {
        console.log( err);
      return res
        .status(400)
        .json(err.message)
    }
  };

exports.getUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let result = await User.findById(id);
    if (!result) {
      throw new Error("User not found");
    }
     res
      .json(result)
      .status(200);
  } catch (err: any) {
     res
      .status(500)
      .json(err.message);
  }
};

exports.editUser =async(req: Request, res: Response) => {
  try {
    let id = req.params.id;
    req.body = await User.findByIdAndUpdate(id, req.body);
    res
    .status(200)
    .json(`User with id:${id} was successfully updated.`);
  } catch (err: any) {
    res
    .status(500)
    .json(err.message);
  }
};

exports.deleteUser =async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    req.body = await User.deleteOne({ _id: id })
    res
    .status(200)
    .json(`User with id:${id} was successfully deleted.`);
  } catch (err: any) {
    res
      .status(500)
      .json(err.message);
  }
}