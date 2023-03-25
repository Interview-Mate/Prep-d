const router = require("express").Router();
const interviewCont = require ("./controllers/interview.controller");
const exerciseCont = require ("./controllers/exercise.controller");
const solvedProblemCont = require ("./controllers/solvedProblem.controller");
const userCont = require ('./controllers/user.controller');
const puncCont = require ('./controllers/punctuator.controller');
//const test = require ('./controllers/test');
const textSpeech = require ('./controllers/textSpeech.controller');
const coverLetterCont = require ('./controllers/coverLetter.controller');

import { Request, Response } from "express";

router.get('/', (req: Request, res: Response) => {
  res.send('Hiiii');
});

//user methods
router.post("/user", userCont.createUser);
router.get('/get-all-users', userCont.getAllUsers); //for testing purposes
router.get('/getuser/:email', userCont.getUser);
router.delete("/users/:id", userCont.deleteUser);
router.put("/user/:id", userCont.editUser);

//interview methods
router.get("/get-all-interviews/:userId", interviewCont.getInterviewsByUser);
router.get("/interview/:id", interviewCont.getInterview);
router.post("/interview/:userId", interviewCont.newInterview);
router.put("/interview/:id/questions", interviewCont.addAnswerToInterview);
router.post('/chat-response/:id', interviewCont.getQuestionFromChatGPT)

router.post('/interview-rating/:id', interviewCont.getInterviewRating)


//exercise methods
router.get("/get-all-exercises", exerciseCont.getAllExercises);

//solved problems
router.get("/problems/:userId", solvedProblemCont.getSolvedProblems);
router.get("/get-all-solved", solvedProblemCont.getAllSolvedProblems);
router.post("/problem", solvedProblemCont.addSolvedProblem);

//Cover letter creator
router.post("/create-cover-letter", coverLetterCont.createCoverLetter);

// NEW
router.post("/punctuate", puncCont.punctuate);

//test
//outer.post("/test", test.bubu);



router.post("/api/text-to-speech", textSpeech.speechMe);

export default router;