const router = require("express").Router();

const interviewCont = require("./controllers/interview.controller");
const exerciseCont = require("./controllers/exercise.controller");
const solvedProblemCont = require("./controllers/solvedProblem.controller");
const userCont = require("./controllers/user.controller");
const puncCont = require ('./controllers/punctuator.controller');

import { Request, Response } from "express";

router.get("/", (req: Request, res: Response) => {
  res.send("Hiiii");
});

//user methods
router.post("/user", userCont.createUser);
router.get("/get-all-users", userCont.getAllUsers); //for testing purposes
router.get("/getuser/:email", userCont.getUser);
router.delete("/users/:id", userCont.deleteUser);
router.put("/user/:id", userCont.editUser);

//interview methods

router.get("/interview/:interviewid", interviewCont.getInterview);
router.get("/get-all-interviews/:userid", interviewCont.getInterviewsByUser);
router.put(
  "/interview/:interviewid/questions",
  interviewCont.addQuestionToInterview
);
router.post("/interview/:userId", interviewCont.newInterview);
router.post('/chat-response', interviewCont.getQuestionFromChatGPT)

//exercise methods
//TODO
router.get("/get-all-exercises", exerciseCont.getAllExercises);
// router.get('/getuser/:id', exerciseCont.getExercise);
// router.post("/user/:user_id", exerciseCont.addExercise);

//solved problems
router.get("/problems/:userId", solvedProblemCont.getSolvedProblems);
router.get("/get-all-solved", solvedProblemCont.getAllSolvedProblems);
router.post("/problem", solvedProblemCont.addSolvedProblem);

router.post("/punctuate", puncCont.punctuate);

export default router;

