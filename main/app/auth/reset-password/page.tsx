"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthQuery } from "@/queries";
import Loading from "@/components/custom/Loading";
import { useAppContext } from "@/providers/appContext";

const ResetPasswordPage = () => {
  const { baseURL } = useAppContext();
  const authQuery = new AuthQuery(baseURL);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: () => authQuery.resetPassword({ token, password }),
    onSuccess: () => setSuccess(true),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <input
          type="text"
          placeholder="Reset Token"
          className="w-full p-2 border rounded"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
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
          Reset Password
        </button>
        {mutation.isPending && <Loading status="loading" />}
        {mutation.isError && (
          <div className="text-red-500 text-sm">
            {mutation.error.message || "Reset failed"}
          </div>
        )}
        {success && (
          <div className="text-green-500 text-sm">
            Password reset!{" "}
            <a href="/auth/login" className="underline">
              Login
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
