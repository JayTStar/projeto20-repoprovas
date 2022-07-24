import { Router } from "express";

import validateSchema from "../middlewares/schemaValidation.js";
import userSchemas from "../schemas/userSchemas.js";

import * as userController from "../controllers/userControllers.js"

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchemas.signUpSchema), userController.signup);
userRouter.get("/sign-in", validateSchema(userSchemas.signInSchema), );