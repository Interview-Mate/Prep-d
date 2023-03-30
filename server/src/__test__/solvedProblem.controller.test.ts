//@ts-nocheck
import  request from "supertest";
import { config } from "dotenv";
config();
import app  from "../index";
import mongoose from "mongoose";
import SolvedProblem from "../models/solvedProblem";


beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

// router.post("/problem", solvedProblemCont.addSolvedProblem);
describe("POST /problem ", () => {
  it("should add a new solved problem", async () => {
    const res = await request(app)
      .post("/problem")
      .send({
        user_id: "1234",
        problem_id: "5678",
        solution: "...",
        score: 100,
        runtime: 10,
        solveTime: 10,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user_id).toEqual("1234");
    expect(res.body.problem_id).toEqual("5678");
    expect(res.body.score).toEqual(100);
  });

  it("should update an existing solved problem", async () => {
    const res = await request(app)
      .post("/problem")
      .send({
        user_id: "1234",
        problem_id: "5678",
        solution: "...",
        score: 200,
        runtime: 20,
        solveTime: 20,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.score).toEqual(200);
  });

  it("should return an error if there is a problem with the request", async () => {
    const res = await request(app)
      .post("/problem")
      .send({
        user_id: "1234",
        problem_id: "5678",
        score: 50,
      });
    expect(res.statusCode).toEqual(403);

    it("should return an error if there is a missing valuet", async () => {
      const res = await request(app)
        .post("/problem")
        .send({
          score: 50,
        });
      expect(res.body).toEqual("user_id or problem_id missing");
    });
  });

});
