"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthQuery } from "@/queries";
import Loading from "@/components/custom/Loading";
import { useAppContext } from "@/providers/appContext";
import { useAuth } from "@/providers/authProvider";

const LoginPage = () => {
  const { baseURL } = useAppContext();
  const { login } = useAuth();
  const authQuery = new AuthQuery(baseURL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => authQuery.login({ email, password }),
    onSuccess: (data) => {
      login(data.token);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          disabled={mutation.isPending}
        >
          Login
        </button>
        {mutation.isPending && <Loading status="loading" />}
        {mutation.isError && (
          <div className="text-red-500 text-sm">
            {mutation.error.message || "Login failed"}
          </div>
        )}
      </form>
      <a
        href="/auth/forgot-password"
        className="mt-4 text-purple-500 hover:underline"
      >
        Forgot password?
      </a>
      <a href="/auth/register" className="mt-2 text-purple-500 hover:underline">
        {" Don't have an account? Register"}
      </a>
    </div>
  );
};

export default LoginPage;
