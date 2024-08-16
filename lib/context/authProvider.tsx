"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../client";
export const revalidate = 0;
const authContext = createContext(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session?.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

export const useUser = () => useContext(authContext);
