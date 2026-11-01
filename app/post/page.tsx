"use client";
import { useState } from "react";
import Link from "next/link";
import { postBlog } from "./actions";
export default function Page() {
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState([""]);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  function addParagraph() {
    setParagraphs([...paragraphs, ""]);
  }
  function changeParagraph(index: number, value: string) {
    const updated = [...paragraphs];
    updated[index] = value;
    setParagraphs(updated);
  }
  function removeParagraph(index: number) {
    if (paragraphs.length === 1) {
      setParagraphs([""]);
      return;
    }
  setParagraphs(paragraphs.filter((_, i) => i !== index));
  }
  async function publishPost() {
    if (!title.trim() || paragraphs.every(p => !p.trim())) {
      setMessage("Please enter a title and content.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      await postBlog({
        id: crypto.randomUUID(),
        date: new Date(),
        title,
        content: paragraphs,
        image,
        link,
      });
      setMessage("Post published successfully!");
      setTitle("");
      setParagraphs([""]);
      setImage("");
      setLink("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="createPage">
      <h1>Create Blog</h1>
      <p>Share your thoughts with the world</p>
      <div className="createBox">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>Content</h3>
        {paragraphs.map((paragraph, index) => (
          <div className="paragraphBox" key={index}>
            <div className="paragraphTop">
              <span>Paragraph {index + 1}</span>
              <button type="button" onClick={() => removeParagraph(index)}>
                Delete
              </button>
            </div>

            <textarea
              placeholder="Write your paragraph here..."
              value={paragraph}
              onChange={(e) => changeParagraph(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" className="addParagraph" onClick={addParagraph}>
          + Add Paragraph
        </button>
        <h3>Add Image</h3>
        <input
          type="url"
          placeholder="Paste image URL here"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image && (
          <img src={image} alt="Preview" className="imagePreview" />
        )}
        <h3>Add Link</h3>
        <input
          type="url"
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="postButtons">
          <Link href="/blogs" className="cancelButton">
            Cancel
          </Link>
          <button
            className="publishButton"
            onClick={publishPost}
            disabled={loading}>
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
        {message && <p className="postMessage">{message}</p>}
      </div>
    </div>
  );
}
