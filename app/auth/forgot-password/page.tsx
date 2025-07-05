"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthQuery } from "@/queries";
import Loading from "@/components/custom/Loading";

const authQuery = new AuthQuery();

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: () => authQuery.forgotPassword({ email }),
    onSuccess: () => setSuccess(true),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
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
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          disabled={mutation.isPending}
        >
          Send Reset Link
        </button>
        {mutation.isPending && <Loading status="loading" />}
        {mutation.isError && (
          <div className="text-red-500 text-sm">
            {(mutation.error as any)?.response?.data?.message ||
              "Request failed"}
          </div>
        )}
        {success && (
          <div className="text-green-500 text-sm">
            Check your email for a reset link.
          </div>
        )}
      </form>
      <a href="/auth/login" className="mt-4 text-purple-500 hover:underline">
        Back to Login
      </a>
    </div>
  );
};

export default ForgotPasswordPage;
