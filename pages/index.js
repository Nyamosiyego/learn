/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Layout from "./components/layout";
import { useSession, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between">
        <User />
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt={Profile} className="w-6 h-6"/>
        <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}

const User = () => {
  const { data: session } = useSession();
  if (session?.user.name) {
    return <div className="text-blue-900">Hello, <b>{session?.user?.name}</b></div>;
  } else {
    return <div className="text-blue-900">Hello, <b>{session?.user?.email}</b></div>;
  }
};

const Profile = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}