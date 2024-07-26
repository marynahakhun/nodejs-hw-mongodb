import createHttpError from "http-errors";
import { singup, findUser } from "../sevices/users.js";
import { compareHash } from "../utils/hash.js";
import createSession from "../sevices/auth-services.js";
import { findSession, deleteSession } from "../sevices/auth-services.js";
import { requestResetToken } from "../sevices/auth-services.js";
import { resetPassword } from '../sevices/auth-services.js';


const setupResponseSession = (res, {refreshToken, refreshTokenValidUntil, _id})=> {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });
}
export const signupController = async (req, res) => {

    const { email } = req.body;
    const user = await findUser({ email })
    if (user) {
        throw createHttpError(409, "Email Already in Use")
    }
    const newUser = await singup(req.body);
    const data = {
        name: newUser.name,
        email: newUser.email,
    }
     res.status(201).json({
        status: 201,
        data,
        message: "User signup successfuly",
    })
};
// export const signinController = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await findUser({email});
//     if (!user) {
//        throw createHttpError(409, "email not found")
//     }
//     const comparePassword = compareHash(password, user.password);
//     if (!comparePassword) {
//         throw createHttpError(401, "password is invalid")
        
//     }
//     const { accessToken, refreshToken, _id, refreshTokenValidUntil } = await createSession(user._id);
//     res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         expires: refreshTokenValidUntil,
//     });
//      res.cookie("sessionId", _id,{
//         httpOnly: true,
//         expires: refreshTokenValidUntil,
//     })
//     res.json({
//         status: 200,
//         message: "User signin successfully",
//         data: {
//             accessToken: accessToken,
//         }
//     }); 
// }

export const signinController = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });

    if (!user) {
       throw createHttpError(409, "email not found");
    }

    const isPasswordValid = await compareHash(password, user.password); // використання await для асинхронної функції

    if (!isPasswordValid) {
        throw createHttpError(401, "password is invalid");
    }

    const { accessToken, refreshToken, _id, refreshTokenValidUntil } = await createSession(user._id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

    res.json({
        status: 200,
        message: "User signin successfully",
        data: {
            accessToken: accessToken,
        }
    });
}
export const refreshController = async(req, res)=> {
    const {refreshToken, sessionId} = req.cookies;
    const currentSession = await findSession({_id: sessionId, refreshToken});

    if(!currentSession) {
        throw createHttpError(401, "Session not found");
    }

    const refreshTokenExpired = new Date() > new Date(currentSession.refreshTokenValidUntil);
    if(refreshTokenExpired) {
        throw createHttpError(401, "Session expired");
    }

    const newSession = await createSession(currentSession.userId);

    setupResponseSession(res, newSession);

    res.json({
        status: 200,
        message: "User signin successfully",
        data: {
            accessToken: newSession.accessToken,
        }
    });
}
export const signoutController = async (req, res) => {
    const { sessionId } = req.cookies;
    if (!sessionId) {
        throw createHttpError(401, "Session not found");
    }

    await deleteSession({ _id: sessionId });

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
}

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    console.log(req.body.email)
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};