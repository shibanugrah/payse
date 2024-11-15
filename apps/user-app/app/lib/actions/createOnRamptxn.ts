"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount:number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString(); //This token should be ideally come from the bank, but since we dont have banking api right now so we're simulating that there is a bank that will send our users to a random token.
    const userId = session.user.id;
    if(!userId){
        return {
            message: "User not logged in."
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })
    return {
        message: "On Ramp Transaction created successfully."
    }
}