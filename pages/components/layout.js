import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import Nav from "./nav";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
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
