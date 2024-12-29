import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { postCommentSchema } from "@/app/validationShemas";
export async function GET(request: NextRequest) {
  const comments = await prisma.comment.findMany();
  return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });
  const body = await request.json();
  const validation = postCommentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newComment = await prisma.comment.create({
    data: { content: body.content, postId: body.postId, userId: body.userId },
  });

  return NextResponse.json(newComment, { status: 201 });
}
