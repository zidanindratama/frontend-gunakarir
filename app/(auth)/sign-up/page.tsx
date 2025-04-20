import { SignupForm } from "@/components/auth/signup-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link
              href="/"
              className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <Image
                src="https://assets.aceternity.com/logo-dark.png"
                alt="logo"
                width={30}
                height={30}
              />
              <span className="text-xl font-medium text-black dark:text-white">
                GunaKarir
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs md:max-w-lg">
              <SignupForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="/auth/signup.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
