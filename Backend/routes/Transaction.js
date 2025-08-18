import express from "express";
import { Sender } from "../controller/Transactions.js";

const router = express.Router();

router.post('/send',Sender)

export default router