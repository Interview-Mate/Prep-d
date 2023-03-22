const router = require("express").Router();
const interviewCont = require("./controllers/interview.controller");
const exerciseCont = require("./controllers/exercise.controller");
const solvedProblemCont = require("./controllers/solvedProblem.controller");
const userCont = require("./controllers/user.controller");
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
router.post("/interview/:userid", interviewCont.newInterview);
router.put(
  "/interview/:interviewid/questions",
  interviewCont.addQuestionToInterview
);

//exercise methods
router.get("/get-all-exercises", exerciseCont.getAllExercises);

//solved problems
router.get("/problems/:userId", solvedProblemCont.getAllSolvedProblems);
router.post("/problem", solvedProblemCont.addSolvedProblem);

export default router;
