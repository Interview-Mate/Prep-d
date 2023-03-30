//@ts-nocheck
import { config } from "dotenv";
config();
import  request from "supertest";
import app  from "../index";
import mongoose from "mongoose";
import User from "../models/user";


beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});


describe("GET /get-all-users", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app)
      .get("/get-all-users");
    expect(response.statusCode).toBe(200);
  });

  it("GET /get-all-users should return an array", async () => {
    const res = await request(app)
      .get("/get-all-users");
    expect(Array.isArray(res.body)).toBe(true);
  });

  

  it("GET /users should return status 404", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(404);
  });
});

const testUser = {
  name: "John",
  surname: "Doe",
  email: "john.doe@smth.com",
  level: "1"
};

describe("POST /user", () => {
  it("should create a new user", async () => {

    const res = await request(app).post("/user").send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("email");
    expect(res.body.name).toEqual(testUser.name);
    expect(res.body.email).toEqual(testUser.email);
  });

  it("should return error, status code 403", async () => {
    const user = {
      name: "John",
      email: "john.doe@smth.com",
    };
    const res = await request(app).post("/user").send(user);
    expect(res.statusCode).toEqual(403);
  });
});

describe("GET /getuser/:email", () => {
  it("should get a user by email", async () => {
    const user = {
      name: "Bubu",
      surname: "Bu",
      email: "bu.bu@smth.com",
      level: "2"
    };
    await User.create(user);
    const res = await request(app)
      .get(`/getuser/${user.email}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name).toEqual(user.name);
    expect(res.body[0].email).toEqual(user.email);
  });

});

describe("PUT /user/:id", () => {
  it("should update an user", async () => {
    const res = await request(app)
      .put("/user/6421b63e26ef74326cc9df1f")
      .send({
        name: "Joe",
        email: "joe.doe@gmail.com",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Joe");
  });

  it("should return 500 when user not found", async () => {
    const res = await request(app).
      put("/user/some-id-12653").send({ name: "John Doe" });
    expect(res.statusCode).toEqual(500);
  });
});


describe("DELETE /users/:id", () => {
  it("should delete a user by id", async () => {
    const user = await User.create({
      name: "John",
      surname: "Doedoe",
      email: "john.doedoe@asdasd.com",
      level:"3"
    });
    const res = await request(app).delete(`/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(`User with id:${user._id} was successfully deleted.`);
  });
});