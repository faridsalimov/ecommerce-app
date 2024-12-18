"use client";

import { signIn } from "next-auth/react";
import AuthForm from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/app/actions/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Daxil ol</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm type="login" onSubmit={login} />
          <div className="mt-4 text-center">
            <button
              className="btn btn-primary w-full mb-3 flex items-center justify-center gap-2"
              onClick={() => signIn("google")}
            >
              <FcGoogle size={20} />
              Google ilə daxil ol
            </button>

            <button
              className="btn btn-secondary w-full flex items-center justify-center gap-2"
              onClick={() => signIn("github")}
            >
              <FaGithub size={20} />
              GitHub ilə daxil ol
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
