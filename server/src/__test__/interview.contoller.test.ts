
//@ts-nocheck
import { config } from "dotenv";
config();
import  request from "supertest";
import app  from "../index";
import mongoose from "mongoose";
import Interview from "../models/interview";


beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

// get('/get-all-interviews/:userId', interviewCont.getInterviewsByUser
describe(" GET /get-all-interviews/:userId", () => {
  it("should return 200 and an array of interviews for a valid user id", async () => {
    const res = await request(app).get("/get-all-interviews/64218459cbc75b4ea12e4d12");
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 500 and an error message for an invalid user id", async () => {
    const res = await request(app).get("/get-all-interviews/invalid-user-id");
    expect(res.status).toEqual(500);
    expect(res.body).toEqual("The user ID is either missing or invalid.");
  });
});


// get('/interview/:id', interviewCont.getInterview);
describe("GET /interview/:id", () => {
  it("should return 200 and an interview for a valid interview id", async () => {
    const interview = {
      _id: "507f191e810c19729de860ea",
      user_id: "507f1f77bcf86cd799439011",
      level: "entry",
      company: "Google",
      field: "Software Engineering",
    };
    await Interview.create(interview);

    const res = await request(app)
      .get(`/interview/${interview._id}`);
    expect(res.status).toEqual(200);
    expect(res.body._id).toEqual(interview._id);
  });

  it("should return 404 for an invalid interview id", async () => {
    const res = await request(app)
      .get("/interviews/invalid-int-id");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({});
  });

  it("should return 500 and an error message if the interview does not exist", async () => {
    const res = await request(app).get("/interview/wrong_id}");
    expect(res.status).toEqual(500);
    expect(res.body).toEqual("Cast to ObjectId failed for value \"wrong_id}\" (type string) at path \"_id\" for model \"Interview\"");
  });
});



// post('/interview/:userId', interviewCont.newInterview);
describe("POST /Interview", () => {

  it("should return 201 and the created interview for a valid request", async () => {
    const res = await request(app)
      .post("/interview/64218459cbc75b4ea12e4d12").send({
        level: "entry",
        company: "Google",
        field: "Software Engineering",
        title: "Backend Developer",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user_id).toEqual("64218459cbc75b4ea12e4d12");
    expect(res.body.company).toEqual("Google");
    expect(res.body.field).toEqual("Software Engineering");
    expect(res.body.title).toEqual("Backend Developer");
    expect(Array.isArray(res.body.conversation)).toBe(true);
  });

  it("should return 500 and an error message for an invalid request", async () => {
    const res = await request(app)
      .post("/interview/64218459cbc75b4ea12e4").send({
        someInvalidData : ""
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual("The user ID is either missing or invalid.");
  });
});

