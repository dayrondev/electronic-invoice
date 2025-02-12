"use client";

import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { signin } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SubmitButton from "@/components/ui/custom-submit-button";
import { buttonVariants } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";
import { useUserStore } from "@/store/user.store";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const setUser = useUserStore((state) => state.setUser);
  const [state, action] = useActionState(signin, undefined);

  if (state?.ok && state.user) {
    setUser(state.user);
    redirect("/application");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              {state?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="jhon.doe@example.com"
                  required
                />
                {state?.error?.email && (
                  <p className="text-xs text-red-700">{state.error.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
                {state?.error?.password && (
                  <p className="text-xs text-red-700">{state.error.password}</p>
                )}
              </div>
              <SubmitButton>Login</SubmitButton>
              <a
                href={`${BACKEND_URL}/auth/google/login`}
                className={cn(
                  "cursor-pointer",
                  buttonVariants({
                    variant: "outline",
                  })
                )}
              >
                Login with Google
              </a>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
