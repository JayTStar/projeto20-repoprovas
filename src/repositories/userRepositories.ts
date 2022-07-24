import { Users } from "@prisma/client";
import prisma from "../config/db";

export type UserData = Omit<Users, "id">;

export async function create(userData: UserData) {
    await prisma.users.create({
        data: userData,
    });
}

export async function getByEmail(email: string) {
    const user = await prisma.users.findFirst({
        where: { email },
    });

    return user;
}