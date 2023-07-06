import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import Nav from "./nav";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });


export default function Layout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  function handleSignOut() {
    signOut();
  }
   if (!session) {
     return (
       <div className="bg-bgGray w-screen h-screen flex items-center">
         <div className="text-center w-full">
           <Link
              href="/login"
             className="bg-white p-2 px-4 rounded-lg btn-primary"
           >
             Login
           </Link>
         </div>
       </div>
     );
   }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-1 mb-2 mr-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}


