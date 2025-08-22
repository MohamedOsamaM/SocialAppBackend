//SETUP ENV
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./config/.env.development") });
//load express and express types
import type { Express, Request, Response } from "express";
import express from "express";
//third party middleware
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
//module routing
import authController from "./modules/auth/auth.controller";
import { globalErrorHandling } from "./utils/response/error.response";
//handle base rate limit on all api requests
const Limiter = rateLimit({
  windowMs: 60 * 60000,
  limit: 2000,
  message: { error: "too many request please try again later" },
  statusCode: 429,
});
//app-start-point
const bootstrap = (): void => {
  const app: Express = express();
  const port: number | string = process.env.PORT || 5000;
  //global application middleware
  app.use(cors(), express.json(), helmet(), Limiter);
  //app-routing
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: `Welcome to ${process.env.APPLICATION_NAME} Backend` });
  });
  //sub-app-routing-modules
  app.use("/auth", authController);
  //Invalid-Routing
  app.use("{/*dummy}", (req: Request, res: Response) => {
    return res.status(404).json({
      message: "invalid application routing plz check the method and url",
    });
  });
  //global error handling
  app.use(globalErrorHandling);
  //start server
  app.listen(port, () => {
    console.log(`server is  running on port ${port}`);
  });
};

export default bootstrap;
