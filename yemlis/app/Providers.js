"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children, session }) => {
  console.log("AuthProvider session")
  console.log(session)
  return <SessionProvider
    session={session} >
    {children}
  </SessionProvider>;
}; 