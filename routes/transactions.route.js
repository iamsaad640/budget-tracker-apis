import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
} from "../controllers/transaction.controller.js";

const router = Router();

router.get("/", getAllTransactions);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

export default router;
