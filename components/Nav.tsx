"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function Nav(){
  const router = useRouter()
  const {data : session, isPending} = authClient.useSession();
   const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          router.refresh();
        },
      },
    });
}; 
return (
  <nav className="flex justify-between items-center py-4 px-8 bg-slate-900 text-white border-b border-slate-800"> <Link href="/" className="text-xl font-bold tracking-wide hover:text-blue-400 transition">
        MERO BLOG
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/blogs" className="hover:text-blue-400 transition">
          Blogs
        </Link>
        <Link href="/about" className="hover:text-blue-400 transition">
          About
        </Link>

        {isPending ? (
          <span className="text-sm text-gray-400">Loading...</span>
        ) : session ? (
          <div className="flex items-center gap-4">
            <Link href="/post" className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition">
              + New Post
            </Link>
            <span className="text-sm text-gray-300 font-medium">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm font-medium transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm font-medium transition"
          >
            Sign In
          </Link>
        )}
      </div>   
      </nav>
)
}

