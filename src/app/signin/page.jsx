
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");


  const getCallbackURL = () => {
  const params = new URLSearchParams(window.location.search);
  const callbackURL = params.get("callbackURL");

  if (callbackURL?.startsWith("/") && !callbackURL.startsWith("//")) {
    return callbackURL;
  }

  return "/";
};

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    if (!user.email || !user.password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন!");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: getCallbackURL(),
    });

    if (data) {
  toast.success("সফলভাবে সাইন ইন হয়েছে!");
  window.location.href = getCallbackURL();
}

    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি!");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading("google");

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: getCallbackURL(),
    });

    if (error) {
      toast.error(error.message || "Google login ব্যর্থ হয়েছে!");
      setSocialLoading("");
    }
  };

  const handleGithubSignIn = async () => {
    setSocialLoading("github");

    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: getCallbackURL(),
    });

    if (error) {
      toast.error(error.message || "GitHub login ব্যর্থ হয়েছে!");
      setSocialLoading("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-[#203328]">
            সাইন ইন
          </h1>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="w-full max-w-[470px] rounded-2xl border border-[#dce6dc] bg-white/80 p-6 shadow-sm sm:p-7">
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#203328]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[#dce5dc] bg-transparent px-3.5 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#203328]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-[#dce5dc] bg-transparent px-3.5 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="w-full rounded-lg bg-[#07883f] px-4 py-3 font-semibold text-white shadow-md transition hover:bg-[#067534] disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce5dc] px-3 py-3 text-sm font-semibold text-[#203328] hover:bg-gray-50 disabled:opacity-60"
            >
              <span className="text-lg font-bold text-blue-500">G</span>
              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={handleGithubSignIn}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce5dc] px-3 py-3 text-sm font-semibold text-[#203328] hover:bg-gray-50 disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.75-1.32-3.75-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.62 5.23-5.11 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-[#35443a]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#07883f] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-7 text-sm text-gray-500 hover:text-green-700"
        >
            <div className="flex gap-2">
                <i className="fa-solid fa-arrow-left pt-1"></i>
                <p>হোম পেজে ফিরে যান</p>
            </div>
          
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
