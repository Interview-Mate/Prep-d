import {Router} from 'express';
import * as interviewCont  from  "./controllers/interview.controller";
import * as exerciseCont  from  "./controllers/exercise.controller";
import * as solvedProblemCont  from  "./controllers/solvedProblem.controller";
import * as userCont  from  './controllers/user.controller';
import * as puncCont  from  './controllers/punctuator.controller';
import * as textSpeech  from  './controllers/textSpeech.controller';
import * as coverLetterCont  from  './controllers/coverLetter.controller';

import { Request, Response } from "express";

const router =  Router();

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
router.get("/interview/:id", interviewCont.getInterviewByInterviewId);
router.post("/interview/:userId", interviewCont.newInterview);
router.put("/interview/:id/questions", interviewCont.addAnswerToInterview);
router.post('/chat-response/:id', interviewCont.getQuestionFromChatGPT)

router.post('/interview-rating/:id', interviewCont.getInterviewRating)


//exercise methods
router.get("/get-all-exercises", exerciseCont.getAllExercises);
router.get("/get-all-exercises/:id", exerciseCont.getAllExercises);

//solved problems
router.get("/problems/:userId", solvedProblemCont.getSolvedProblems);
router.get("/get-all-solved", solvedProblemCont.getAllSolvedProblems);
router.post("/problem", solvedProblemCont.addSolvedProblem);

//Cover letter creator
router.post("/create-cover-letter", coverLetterCont.createCoverLetter);
router.post("/get-pdf-review", coverLetterCont.getTextReview);
router.post("/get-text-review", coverLetterCont.getPdfReview);

// NEW
router.post("/punctuate", puncCont.punctuate);


router.post("/api/text-to-speech", textSpeech.speechMe);

export default router;