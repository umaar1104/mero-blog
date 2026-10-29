"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/post/actions";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const answer = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!answer) return;

    setLoading(true);

    try {
      await deletePost(id);

      router.push("/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete post");
      setLoading(false);
    }
  }

  return (
    <button
      className="deleteButton"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete Post"}
    </button>
  );
}