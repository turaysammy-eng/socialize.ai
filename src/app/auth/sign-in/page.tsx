"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    await supabase.auth.signInWithPassword({ email, password });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Sign In to SOCIALIZE</h1>
          <p className="text-sm text-gray-400">Enter your credentials to access your developer account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
          <Link href="/auth/forgot-password" className="hover:text-white">Forgot password?</Link>
          <Link href="/auth/sign-up" className="hover:text-white">Don&apos;t have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
}
