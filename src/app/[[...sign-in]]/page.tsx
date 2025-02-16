"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Loginpage = () => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);
  return (
    <div className="h-screen flex items-center justify-center bg-devanshSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-1"
        >
          <h1 className="text-xl flex items-center gap-1 font-bold justify-center">
            <Image src={"/logo.png"} width={24} height={24} alt="Logo" />
            Schoolama
          </h1>
          <h2 className="text-gray-400 flex justify-center">
            Sign in to your account
          </h2>

          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field
            name="identifier"
            className="flex flex-col gap-2 mt-4 group"
          >
            <Clerk.Label className="text-xs text-gray-500 group-focus-within:font-semibold group-focus-within:scale:115 transition-all duration-300">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="px-3 py-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-gray-500 outline-none transition-all duration-300"
            />
            <Clerk.FieldError className="text-xs text-red-400 " />
          </Clerk.Field>

          <Clerk.Field
            name="password"
            className="flex flex-col gap-2 mt-4 group"
          >
            <Clerk.Label className="text-xs text-gray-500 group-focus-within:font-semibold group-focus-within:scale:115 transition-all duration-300">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="px-3 py-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-gray-500 outline-none transition-all duration-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-2 rounded-lg text-sm p-[10px] "
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default Loginpage;
