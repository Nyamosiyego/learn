import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol } from "react-icons/hi";
import { HiFingerPrint } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@/lib/validate";
import { useRouter } from "next/router";
import { csrfToken } from "next-auth/react";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });
  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }
  // Google handler function
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  // Github Handler function
  async function handleGithubSignIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-2">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet
          </p>
        </div>
        {/* form */}
        <form
          className="flex flex-col gap-4 mt-8"
          onSubmit={formik.handleSubmit}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Link href={"api/auth/signin"}>
            <button type="submit" className={styles.button}>
              Sign in with Email
            </button>
          </Link>
          <div>
            <p className="text-gray-800 text-2xl font-bold">or</p>
          </div>

          {/* login buttons */}
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={styles.button_custom}
            >
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
            <button
              type="button"
              onClick={handleGithubSignIn}
              className={styles.button_custom}
            >
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
      
      </section>
    </Layout>
  );
};

export default Login;
