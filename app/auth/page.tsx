"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
const SigninBox = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[400px] p-6 bg-card rounded-xl shadow-lg border border-border">
      <h2 className="mb-6 text-xl font-bold text-center text-foreground">
        Login with Email and Password
      </h2>
      <form className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
        >
          Login
        </button>
      </form>
      <div className="w-full h-px border-t border-border mt-4"></div>
      <button
        className="btn mt-3 w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-lg py-2 transition-colors"
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000" })
        }
      >
        <FcGoogle /> Sign in with Google
      </button>
      <button
        className="btn mt-2 w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-lg py-2 transition-colors"
        onClick={() =>
          signIn("github", { callbackUrl: "http://localhost:3000" })
        }
      >
        <FaGithub /> Sign in with Github
      </button>
      <p className="mt-4 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-purple-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SigninBox;
