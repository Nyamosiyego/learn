import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '@/layout/layout'
import Link from 'next/link'
import styles from '@/styles/Form.module.css'
import Image from 'next/image'
import { HiAtSymbol } from 'react-icons/hi'
import { HiFingerPrint } from 'react-icons/hi'
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const[show, setShow] = useState(false)
  // Google handler function
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet
          </p>
        </div>
        {/* form */}
        <form className="flex flex-col gap-4">
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
            />
            <span className='icon flex items-center px-4'>
              <HiAtSymbol size={25}/>
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="password"
              className={styles.input_text}
            />
            <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
              <HiFingerPrint size={25}/>
            </span>
          </div>
          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button type="button" onClick={handleGoogleSignIn} className={styles.button_custom}>
              Sign in with Google
              <Image
                src={"/assets/google.svg"}
                width="20"
                height="20"
                alt=""
              ></Image>
            </button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom}>
              Sign in with Github
              <Image
                src={"/assets/github.svg"}
                width="25"
                height="25"
                alt=""
              ></Image>
            </button>
          </div>
        </form>
        {/* bottom */}
        <div className="bottom">
          <p className="text-center text-gray-400">
            Dont have an account?
            <Link legacyBehavior href={"/register"}>
              <a className="text-blue-700">Sign Up</a>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default Login