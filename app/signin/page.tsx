
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (signUp && password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const result = signUp
        ? await authClient.signUp.email({
            email,
            name,
            password,
          })
        : await authClient.signIn.email({
            email,
            password,
          });

      if (result.error) {
        setMessage(
          signUp
            ? "Could not create account. This email may already be registered."
            : "Invalid email or password."
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{signUp ? "Sign Up" : "Sign In"}</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {signUp && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={signUp ? 8 : 1}
        required
      />

      {signUp && (
        <p>Password must contain at least 8 characters.</p>
      )}

      {message && <p>{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : signUp ? "Sign Up" : "Sign In"}
      </button>

      <p>
        {signUp
          ? "Already have an account?"
          : "Don't have an account?"}
        {" "}
        <button
          type="button"
          onClick={() => {
            setSignUp(!signUp);
            setMessage("");
          }}
        >
          {signUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </form>
  );
}

export default Page;
