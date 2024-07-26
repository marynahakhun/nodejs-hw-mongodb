import express from "express";
import validateBody from "../utils/validateBody.js";
import {userSignupSchema, userSigninSchema, requestResetEmailSchema} from '../validator/UserShemas.js';
import { signupController, signinController } from '../controllers/auth-controller.js'
import { refreshController, signoutController, requestResetEmailController } from '../controllers/auth-controller.js'
import { resetPasswordSchema } from '../validator/UserShemas.js';
import { resetPasswordController } from '../controllers/auth-controller.js';
import ctrlWrapper from '../utils/ctrlWrapper.js'
const authRouter = express.Router();
authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(signupController));
authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(signinController));
authRouter.post("/refresh", ctrlWrapper(refreshController));
authRouter.post("/logout", ctrlWrapper(signoutController));
authRouter.post('/request-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));
authRouter.post('/reset-pwd',validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController),
);

export default authRouter;