import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepositories.js"
import * as sessionRepository from "../repositories/sessionRepositories.js"

dotenv.config();

export async function signup(userData: userRepository.UserData) {
    const { email, password } = userData;

    await checkEmail(email);

    const encryptedPassword = encryptPassword(password);

    await userRepository.create({ email, password: encryptedPassword });
}

async function checkEmail(email: string) {
    const user = await userRepository.getByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "Email is already registered",
        };
    }
}

function encryptPassword(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return encryptedPassword;
}

export async function signin(userData: userRepository.UserData) {
    const user = await userRepository.getByEmail(userData.email);

    if (!user || !checkPassword(userData.password, user.password)) {
        throw {
            type: "unauthorized",
            message: "Invalid email or password",
        };
    }

    const token = generateToken(user.id);

    await sessionRepository.create({ userId: user.id, token });
    return token;
}

function checkPassword(password: string, passwordHash: string) {
    if (!bcrypt.compareSync(password, passwordHash)) {
        return false;
    }
    return true;
}

function generateToken(userId: number) {
    const data = {
        userId,
    };
    const expirationTime = 60 * 60 * 24 * 7;
    const config = { expiresIn: expirationTime };
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(data, secretKey as string, config);
    return token;
}