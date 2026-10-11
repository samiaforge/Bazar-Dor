
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.password ||
      !user.confirmPassword
    ) {
      toast.error("সবগুলো ঘর পূরণ করুন!");
      setLoading(false);
      return;
    }

    if (user.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      setLoading(false);
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || undefined,
      callbackURL: "/",
    });

    if (data) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
      window.location.href = "/signin";
    }

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading("google");

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
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
      callbackURL: "/",
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
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="w-full max-w-[435px] rounded-2xl border border-[#dce6dc] bg-white/80 p-6 shadow-sm sm:p-6">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#203328]"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-[#dce5dc] bg-transparent px-3.5 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="mb-4">
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
                className="w-full rounded-lg border border-[#dce5dc] bg-transparent px-3.5 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="mb-4">
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
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-[#dce5dc] bg-transparent px-3.5 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#203328]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-[#dce5dc] bg-transparent px-3.5 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="w-full rounded-lg bg-[#07883f] px-4 py-3 font-semibold text-white shadow-md transition hover:bg-[#067534] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce5dc] px-3 py-3 text-sm font-semibold text-[#203328] transition hover:bg-gray-50 disabled:opacity-60"
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
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce5dc] px-3 py-3 text-sm font-semibold text-[#203328] transition hover:bg-gray-50 disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-current"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.75-1.32-3.75-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.62 5.23-5.11 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-[#35443a]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#07883f] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-7 text-sm text-gray-500 transition hover:text-green-700"
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

export default SignUpPage;
