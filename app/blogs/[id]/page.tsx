import type { PostType } from "@/app/post/actions";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { initAuth } from "@/lib/auth";
import DeleteButton from "@/components/DeleteButton";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

async function BlogContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connection();
  await dbConnect();
  const post = (await Post.findOne({ id })) as PostType | null;
  if (!post) {
    redirect("/blogs");
  }
  const auth = await initAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin =
    !!process.env.ADMIN_USER_ID &&
    session?.user.id === process.env.ADMIN_USER_ID;
  return (
    <div className="singleBlog">
      <h1>{post.title}</h1>
      <p className="blogDate">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="blogContent">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="blogImage"
          />
        )}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="blogLink"
          >
            Open Link →
          </a>
        )}
      </div>
      {isAdmin && <DeleteButton id={post.id} />}
    </div>
  );
}
export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading blog...</p>}>
      <BlogContent params={params} />
    </Suspense>
  );
}