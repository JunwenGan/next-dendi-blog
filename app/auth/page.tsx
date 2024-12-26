"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
const SigninBox = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[400px] p-6  bg-white rounded shadow-lg ">
      <h2 className="mb-6 text-xl font-bold text-center">
        Login with Email and Password
      </h2>
      <form className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Login
        </button>
      </form>
      <div className="w-full h-1 border-t mt-3"></div>
      <button
        className="btn mt-2 w-full"
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000" })
        }
      >
        <FcGoogle /> Sign in with Google
      </button>
      <button
        className="btn mt-2 w-full"
        onClick={() =>
          signIn("github", { callbackUrl: "http://localhost:3000" })
        }
      >
        <FaGithub /> Sign in with Github
      </button>
      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SigninBox;
