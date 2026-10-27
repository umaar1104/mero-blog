"use server";

import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { initAuth } from "@/lib/auth";
import { headers } from "next/headers";

export interface PostType {
  id: string;
  date: Date;
  title: string;
  content: string[];
}
export async function postBlog(post: PostType) {
  try {
    const auth = await initAuth();
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Iltimos, oldin tizimga kiring!");
    }
    await dbConnect();
    const newPost = await Post.create(post);
    console.log(newPost);
    return newPost;

  } catch (error) {
    console.error("Error: " + error);
    throw error;
  }
}