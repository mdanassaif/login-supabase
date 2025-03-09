import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseBrowserClient";

export default function Login() {
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      if (session?.data?.session?.user) {
        setUser(session.data.session.user);
        checkUserRegistration(session.data.session.user.email);
      }
    };

    checkAuth();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const checkUserRegistration = async (email) => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (data) {
      router.push("/dashboard");
    } else {
      setIsRegistered(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsRegistered(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        {!user ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Login to Your Account</h2>
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Sign in with Google
            </button>
          </>
        ) : isRegistered === false ? (
          <>
            <h2 className="text-red-500 font-semibold mb-4">
              You are not registered!
            </h2>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </>
        ) : (
          <p>Checking registration...</p>
        )}
      </div>
    </div>
  );
}
