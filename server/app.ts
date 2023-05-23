import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import mongoose, { ConnectOptions } from "mongoose";
import { dbUrl } from "./consts";
import { authRouter } from "./router/auth";
import { usersRouter } from "./router/user";
import errorMiddleware from "./middlewares/error-middleware";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/docs.json";
import { fileRouter } from "./router/file";
import notFoundMiddleware from "./middlewares/not-found-middleware";
import { modRouter } from "./router/mod";
import { folderRouter } from "./router/folder";
import cron from "node-cron";
import { removeExpiredFiles } from "./scripts/removeExpiredFiles";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/mod", modRouter);
app.use("/", notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });

    cron.schedule("0 0 * * *", removeExpiredFiles);
  } catch (e) {
    console.log(e);
  }
};

start();
