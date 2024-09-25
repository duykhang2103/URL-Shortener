import express from "express";
import cors from "cors";
import { urlRouter } from "./app/modules/url/url.router";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", urlRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
