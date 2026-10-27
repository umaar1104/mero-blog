"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; 

export default function Nav(){
  const { data: session } = authClient.useSession();

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "15px", background: "#f4f4f4" }}>
      <Link href="/">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/post">Post</Link>
      <Link href="/about">About</Link>
      <div style={{ marginLeft: "auto" }}>
        {session ? (
          <span> {session.user.name}</span>
        ) : (
          <Link href="/signin">Sign in</Link>
        )}
      </div>
    </nav>
  );
}