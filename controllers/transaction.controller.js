import { transactions } from "../utils/constants.js";
import { validateTransaction } from "../dtos/transaction.dto.js";
import generateId from "../utils/generateId.js";

export const getAllTransactions = (req, res, next) => {
  try {
    if (!transactions.length) {
      return res.formatter.notFound("No transactions available");
    }

    let filteredTransactions = transactions;
    // query t for type
    if (req.query.t) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.type.toLowerCase() === req.query.t.toLowerCase()
      );
    }
    // query c for categories
    if (req.query.c) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.category.toLowerCase() === req.query.c.toLowerCase()
      );
    }

    if (!filteredTransactions.length) {
      return res.formatter.notFound("No transactions match the criteria");
    }

    return res.formatter.ok(filteredTransactions);
  } catch (e) {
    next(e);
  }
};

export const createTransaction = (req, res, next) => {
  try {
    const { error } = validateTransaction.validate(req.body);
    if (error) return res.formatter.badRequest(error.details[0].message);

    const newTransaction = {
      id: generateId(),
      date: new Date().toISOString(),
      ...req.body,
    };

    transactions.push(newTransaction);

    res.formatter.ok(newTransaction);
  } catch (e) {
    next(e);
  }
};

export const deleteTransaction = (req, res, next) => {
  try {
    const id = req.params.id;

    const transactionIndex = transactions.findIndex((t) => t.id != id);

    if (!transactionIndex)
      return res.formatter.notFound("transaction to delete not found");

    const transaction = transactions.splice(transactionIndex, 1);

    res.formatter.ok(transaction[0]);
  } catch (e) {
    next(e);
  }
};
