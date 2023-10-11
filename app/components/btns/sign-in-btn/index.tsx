'use client';

import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button"

interface ISignInBtn {
  className?: string;
  callbackUrl?: string;
}

export const SignInBtn = ({ className, callbackUrl }: ISignInBtn) => {
  return (
    <Button
      className={className}
      onClick={() => signIn(
        '42-school',
        { callbackUrl: callbackUrl }
      )}
    >
      Sign In
    </Button>
  );
}