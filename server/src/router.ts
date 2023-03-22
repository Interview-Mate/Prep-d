const router = require("express").Router();
const interviewCont = require ("./controllers/interview.controller");
const exerciseCont = require ("./controllers/exercise.controller");
const solvedProblemCont = require ("./controllers/solvedProblem.controller");
const userCont = require ('./controllers/user.controller');
const puncCont = require ('./controllers/punctuator.controller');
import { Request, Response } from "express";

router.get('/', (req: Request, res: Response) => {
  res.send('Hiiii');
});

//user methods
router.post("/user", userCont.createUser);
router.get('/get-all-users', userCont.getAllUsers); //for testing purposes
router.get('/getuser/:id', userCont.getUser);
router.delete("/users/:id", userCont.deleteUser);
router.put("/user/:id", userCont.editUser);

//interview methods
router.get("/get-all-interviews/:userId", interviewCont.getInterviewsByUser);
router.get("/interview/:id", interviewCont.getInterview);
router.post("/interview/:userId", interviewCont.newInterview);
router.put("/interview/:id/questions", interviewCont.addQuestionToInterview);
router.post('/chat-response', interviewCont.getQuestionFromChatGPT)


//exercise methods
router.get("/get-all-exercises", exerciseCont.getAllExercises);

//solved problems
router.get("/problems/:userId", solvedProblemCont.getAllSolvedProblems);
router.post("/problem", solvedProblemCont.addSolvedProblem);

// NEW
router.post("/punctuate", puncCont.punctuate);

export default router;