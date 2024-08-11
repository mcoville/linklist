"use client";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroForm(user) {
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push("/account?desiredUsername=" + username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  }

  if (!isMounted) {
    return null; // or a loading spinner, or some placeholder
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex bg-white items-center shadow-lg"
    >
      <span className="bg-white py-4 pl-4">linklist.to/</span>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        type="text"
        className="py-4"
        style={{ backgroundColor: "white", marginBottom: 0, paddingLeft: 0 }}
        placeholder="username"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-4 px-6 rounded-md whitespace-nowrap"
      >
        Join For Free
      </button>
    </form>
  );
}
