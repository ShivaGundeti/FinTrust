import express from "express";
import  AnswerTransactions from "../controller/AnswerTransactions.js";

const router = express.Router();

router.post("/getTransaction",AnswerTransactions)

export default router