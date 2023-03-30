import { Router } from "express";
import * as interviewCont from "./controllers/interview.controller";
import * as exerciseCont from "./controllers/exercise.controller";
import * as solvedProblemCont from "./controllers/solvedProblem.controller";
import * as userCont from "./controllers/user.controller";
import * as puncCont from "./controllers/punctuator.controller";
import * as applicationCont from "./controllers/application.controller";

import { Request, Response } from "express";

const router = Router();

//Postman
router.all("/help", (req: Request, res: Response) => {
  res.redirect("https://documenter.getpostman.com/view/25563730/2s93RRvskj");
});

//User methods
router.post("/user", userCont.createUser);
router.get("/get-all-users", userCont.getAllUsers);
router.get("/getuser/:email", userCont.getUser);
router.delete("/users/:id", userCont.deleteUser);
router.put("/user/:id", userCont.editUser);

//Interview methods
router.get("/get-all-interviews/:userId", interviewCont.getInterviewsByUser);
router.get("/interview/:id", interviewCont.getInterviewByInterviewId);
router.post("/interview/:userId", interviewCont.newInterview);
router.put("/interview/:id/questions", interviewCont.addAnswerToInterview);
router.post("/chat-response/:id", interviewCont.getQuestionFromChatGPT);
router.post("/interview-rating/:id", interviewCont.getInterviewRating);

//Exercise methods
router.get("/get-all-exercises", exerciseCont.getAllExercises);
router.get("/get-all-exercises/:id", exerciseCont.getAllExercises);

//Solved coding problems
router.get("/problems/:userId", solvedProblemCont.getSolvedProblems);
router.get("/get-all-solved", solvedProblemCont.getAllSolvedProblems);
router.post("/problem", solvedProblemCont.addSolvedProblem);

//Cover letter creator
router.post("/create-cover-letter", applicationCont.createCoverLetter);
router.post("/create-resume", applicationCont.createResume);
router.post("/improve-cover-letter", applicationCont.improveCoverLetter);
router.post("/get-text-review", applicationCont.getTextReview);
router.post("/get-pdf-review", applicationCont.getPdfReview);

// Punctuattion
router.post("/punctuate", puncCont.punctuate);



export default router;
