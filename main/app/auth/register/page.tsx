"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthQuery } from "@/queries";
import { useRouter } from "next/navigation";
import Loading from "@/components/custom/Loading";
import { useAppContext } from "@/providers/appContext";

const RegisterPage = () => {
  const { baseURL } = useAppContext();
  const authQuery = new AuthQuery(baseURL);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => authQuery.register({ name, email, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Register
        </button>
        {mutation.isPending && <Loading status="loading" />}
        {mutation.isError && (
          <div className="text-red-500 text-sm">
            {mutation.error.message || "Registration failed"}
          </div>
        )}
      </form>
      <a href="/auth/login" className="mt-4 text-purple-500 hover:underline">
        Already have an account? Login
      </a>
    </div>
  );
};

export default RegisterPage;
