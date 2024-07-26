import {randomBytes} from "node:crypto";
import jwt from 'jsonwebtoken';
import { findUser } from "./users.js";
import { SMTP } from '../constant/index.js';
import env from '../utils/env.js';
import User from "../db/models/User.js";

import { sendEmail } from '../utils/sendMail.js';
import createHttpError from "http-errors";
import handlebars from 'handlebars';
import path from 'node:path';
import { UpdateUser } from "./users.js";
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';
import { TEMPLATES_DIR } from "../constant/index.js";

import Session from "../db/models/Session.js";
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from "../constant/index.js";
export const findSession = filter => Session.findOne(filter);
const createSession = async (userId) => {
    await Session.deleteOne({userId})
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");
    const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
    const refreshTokenValidUntil = new Date (Date.now() + REFRESH_TOKEN_LIFETIME);
    return Session.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    })
}
export default createSession
export const deleteSession = filter => Session.deleteOne(filter);



export const requestResetToken = async (email) => {
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await findUser({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);


  await User.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );


  const deleteResult = await Session.deleteMany({ userId: user._id });


  return {
    status: 200,
    message: 'Password reset successfully',
  };
};