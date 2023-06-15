import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { getSession, useSession } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      {session ? User({ session }) : Guest()}
    </div>
  )
}

function Guest(){
  return(
    <main className="container mx-auto text-center py-20">
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>

      <div className='flex justify-center'>
        <Link legacyBehavior href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
      </div>
    </main>
  )
}

function User({ session }){
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorised User Homepage</h3>
      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className='flex justify-center'>
        <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign Out</button>
      </div>

      <div className="flex justify-center">
        <Link legacyBehavior href={"/profile"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Go to Profile
          </a>
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if(!session){
   return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };}

  return {
    props: { session }
  };
}