import type { PostType } from "../post/actions";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";
import { connection } from "next/server";
export const instant = false;

async function Page() {
  await connection();
  await dbConnect();

  const allPosts = await Post.find().sort({ date: -1 });

  return (
    <div className="blogsPage">

      <h1>Explore Blogs</h1>
      <p>Discover interesting articles and stories.</p>

      <div className="blogsList">
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <Link
              href={`/blogs/${post.id}`}
              key={post._id?.toString()}
              className="blogCard"
            >
              <h2>{post.title}</h2>

              <p>{post.date.toLocaleDateString()}</p>

              <span>Read More →</span>
            </Link>
          ))
        ) : (
          <Link href="/post">No blogs yet, create one here!</Link>
        )}
      </div>

    </div>
  );
}

export default Page;