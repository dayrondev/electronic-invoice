"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { getSession } from "@/lib/session";

const AuthHandler = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const saveUser = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };
    saveUser();
  }, [setUser]);

  return null;
};

export default AuthHandler;
