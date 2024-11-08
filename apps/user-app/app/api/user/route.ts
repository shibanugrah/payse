import { NextResponse } from "next/server";
import {PrismaClient} from '@repo/db/client'

const client = new PrismaClient()

export const GET = async() => {
    await client.user.create({
        data:{
            email: "randomemail",
            name: "Random"
        }
    })
    return NextResponse.json({
        message: "Hey, there."
    })
}