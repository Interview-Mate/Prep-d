const router = require("express").Router();
const interviewCont = require ("./controllers/interview.controller");
const exerciseCont = require ("./controllers/execise.controller");
const userCont = require ('./controllers/user.controller');
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
router.get("/get-all-interviews/:username", interviewCont.getInterviewsByUser);
router.get("/interview/:id", interviewCont.getInterview);
router.post("/interview/:username", interviewCont.newInterview);
router.put("/interview/:id/questions", interviewCont.addQuestionToInterview);
router.post('/chat-response', interviewCont.getQuestionFromChatGPT)


//exercise methods
//TODO
// router.get('/getuser/:id', exerciseCont.getExercise);
// router.post("/user/:user_id", interviewCont.addExercise);


export default router;