"use client";

import { SessionProvider } from "next-auth/react";

type INextAuthProvider = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: INextAuthProvider) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};
