import joi from "joi";

export const validateTransaction = joi.object({
  title: joi.string().min(3).required(),
  amount: joi.number().min(1).required(),
  category: joi
    .string()
    .valid("Food", "Rent", "Shopping")
    .insensitive()
    .required(),
  type: joi.string().valid("expense", "income").insensitive().required(),
});
