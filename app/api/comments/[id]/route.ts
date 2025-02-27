import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    const { id } = await params;
    // Validate postId
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "Invalid postId" },
        { status: 400 } // Bad Request
      );
    }

    // Fetch comments
    const comments = await prisma.comment.findMany({
      where: { postId },
    });

    // Return comments as JSON
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 } // Internal Server Error
    );
  }
}
