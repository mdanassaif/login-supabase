import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseBrowserClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const session = await supabase.auth.getSession();
      if (session?.data?.session?.user) {
        setUser(session.data.session.user);
      } else {
        router.push("/");
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            {user && <span className="text-gray-700">{user.email}</span>}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
        <p className="text-gray-600 mt-2">Services will be added soon.</p>
      </div>
    </div>
  );
}
