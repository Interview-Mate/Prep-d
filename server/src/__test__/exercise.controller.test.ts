//@ts-nocheck
import { config } from "dotenv";
config();
import  request from "supertest";
import app from "../index";
import mongoose from "mongoose";
import Exercise from "../models/exercise";

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

jest.mock("../models/exercise");


describe("GET /get-all-exercises", () => {

  it("should return all exercises", async () => {
    const exercises = await Exercise.find();
    const res = await request(app)
      .get("/get-all-exercises");
    expect(res.status).toBe(200);
    //expect(res.body.length).toEqual(exercises.length);
  });

  it("should get all exercises", async () => {
    const res = await request(app)
      .get("/get-all-exercises");
    //expect(res.body.length).toEqual(7);
    expect(res.statusCode).toBe(200);
  });

  it("GET /get-all-exercises should return an array", async () => {
    const res = await request(app)
      .get("/get-all-exercises");
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /exercises should return status 404", async () => {
    const res = await request(app)
      .get("/exercises");
    expect(res.statusCode).toEqual(404);
  });

  it("should return all mock exercises", async () => {
    const exercises = [
      { name: "Simple Addition", solution1: [ "add(1, 1);", 2 ] },
      { name: "Find Maximum Number", solution1: [ "findMax([3, 7, 1, 9, 4]);", 9 ] },
    ];
    Exercise.find.mockResolvedValue(exercises);

    const res = await request(app)
      .get("/get-all-exercises");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(exercises);
  });


});


