import User from "../db/models/User.js";
import { hashValue } from "../utils/hash.js";
export const findUser = filter => User.findOne(filter);
export const singup = async (data) => {
    const { password } = data;
    const hashPassword =  await hashValue(password, 10)
    return User.create({ ...data, password: hashPassword });
};