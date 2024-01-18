"use client";
import { supabase } from "@/service/supabase";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { useStore } from "zustand";

const AuthChage = () => {
  const { setAuth, auth } = useStore(useAuthStore);

  useEffect(() => {
    const test = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        session ? setAuth(session.user.id) : setAuth("");
      }
    });

    return () => {
      test;
    };
  }, [setAuth]);

  return <></>;
};

export default AuthChage;
