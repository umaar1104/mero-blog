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

async function getUser() {
  const auth = await initAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Please log in first");
  }

  return session.user;
}

export async function postBlog(post: PostType) {
  const user = await getUser();
  await dbConnect();

  await Post.create({
    title: post.title,
    content: post.content,
    image: post.image,
    link: post.link,
    date: new Date(),
    id: crypto.randomUUID(),
    authorId: user.id,
  });

  return { success: true };
}

export async function deletePost(id: string) {
  const user = await getUser();
  await dbConnect();

  const post = await Post.findOne({ id });

  if (!post) {
    throw new Error("Post not found");
  }

  const isAdmin = user.id === process.env.ADMIN_USER_ID;
  const isOwner = post.authorId === user.id;

  if (!isAdmin && !isOwner) {
    throw new Error("You can only delete your own posts");
  }

  await Post.deleteOne({ id });
  return { success: true };
}