import { useEffect, useState } from "react";

import { supabase } from "../../config/supabaseConfig";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      alert(error.message);
      return;
    }

    setUser(data.user);
    return true;
  }

  async function signup({ name, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      console.error("Signup error:", error);
      alert(error.message);
      return;
    }

    console.log("Signup successful:", data);
    alert("Account created successfully. Verification email sent. Please verify your email and login.");
    return true;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    setUser(null);
    return true;
  }

  return { user, authLoading, login, signup, logout };
}
