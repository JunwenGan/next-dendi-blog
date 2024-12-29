import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const posts = await prisma.post.findMany()
    return NextResponse.json(posts)
}