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
  link?: string;
  image?: string;
}
async function getUser() {
  const auth = await initAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("You must log in first");
  }
  return session.user;
}
export async function postBlog(post: PostType) {
  const user = await getUser();
  await dbConnect();
  const newPost = new Post({
    id: crypto.randomUUID(),
    date: new Date(),
    title: post.title,
    content: post.content,
    image: post.image,
    link: post.link,
    authorId: user.id,
  });
  await newPost.save();
  return { success: true };
}
export async function deletePost(id: string) {
  const user = await getUser();
  await dbConnect();
  const post = await Post.findOne({ id: id });
  if (!post) {
    throw new Error("Post not found");
  }
  if (
    user.id !== process.env.ADMIN_USER_ID &&
    post.authorId !== user.id
  ) {
    throw new Error("You cannot delete this post");
  }
  await Post.deleteOne({ id: id });
  return { success: true };
}
