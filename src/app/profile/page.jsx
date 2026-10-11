"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const { signOut, useSession } = authClient;

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 text-center">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-3 text-gray-600">
          আপনার প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।
        </p>
        <button
          onClick={() => router.push("/signin")}
          className="mt-5 rounded-lg bg-green-600 px-6 py-2 text-white"
        >
          সাইন ইন
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {/* Profile summary */}
        <section className="mt-8 flex flex-col items-center gap-5 rounded-2xl bg-white p-6 shadow-sm sm:flex-row">
          {user.image ? (
            <img
              src={user.image}
              alt="প্রোফাইল ছবি"
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2 className="break-words text-xl font-semibold text-gray-900">
              {user.name || "নাম দেওয়া হয়নি"}
            </h2>
            <p className="mt-1 break-all text-gray-500">
              {user.email}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="shrink-0 rounded-lg border border-red-200 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </section>

        {/* Personal information */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="border-b border-gray-100 pb-4 text-xl font-bold text-gray-900">
            তথ্য
          </h2>

          <div className="mt-5">
            <label className="mb-2 block font-medium text-gray-700">
              নাম
            </label>

            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
              {user.name || "নাম দেওয়া হয়নি"}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
