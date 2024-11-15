"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "next-auth";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-sm bg-zinc-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link className="text-xl font-bold mb-4 md:mb-0" href="">
          Mystery Message
        </Link>
        {session ? (
          <span className="mr-4">
            Welcome, {user.username || user.email}{" "}
            <Button variant={"secondary"} className="w-full md:w-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </span>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
