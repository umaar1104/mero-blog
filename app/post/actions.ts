"use server";

import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { initAuth } from "@/lib/auth";
import { headers } from "next/headers";

export interface PostType {
  _id?: string;
  id: string;
  date: Date;
  title: string;
  content: string[];
  link?: string;
  image?: string;
}

export async function postBlog(post: PostType) {
  const auth = await initAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Please log in first");
  }
  const adminId = process.env.ADMIN_USER_ID;
  if (!adminId || session.user.id !== adminId) {
    throw new Error("Only admin can create posts");
  }
  await dbConnect();
await Post.create({
  ...post,
  id: crypto.randomUUID(),
  authorId: session.user.id,
});
  return { success: true };
}
export async function deletePost(id: string) {
  const auth = await initAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Please log in first");
  }

  const adminId = process.env.ADMIN_USER_ID;

  if (!adminId || session.user.id !== adminId) {
    throw new Error("Only admin can delete posts");
  }

  await dbConnect();

  const result = await Post.deleteOne({ id });

  if (result.deletedCount === 0) {
    throw new Error("Post not found");
  }

  return { success: true };
}
