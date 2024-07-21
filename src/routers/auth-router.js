import express from "express";
import validateBody from "../utils/validateBody.js";
import {userSignupSchema, userSigninSchema} from '../validator/UserShemas.js';
import { signupController, signinController } from '../controllers/auth-controller.js'
import {refreshController, signoutController} from '../controllers/auth-controller.js'
import ctrlWrapper from '../utils/ctrlWrapper.js'
const authRouter = express.Router();
authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(signupController));
authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(signinController));
authRouter.post("/refresh", ctrlWrapper(refreshController));
authRouter.post("/logout", ctrlWrapper(signoutController))
export default authRouter;