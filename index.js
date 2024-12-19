import express from "express";
import env from "dotenv";
import transactionRouter from "./routes/transactions.route.js";
import morganBody from "morgan-body";
import { responseEnhancer } from "express-response-formatter";
import error from "./middleware/error.js";

env.config();

const app = express();

app.use(express.json());
morganBody(app);

app.use(responseEnhancer());

app.use("/api/transactions", transactionRouter);

app.use(error);

const port = process.env.PORT ?? 3000;

app.listen(port, () => console.log(`Server is running on Port ${port}`));
