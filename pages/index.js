import Layout from "./components/layout";
import HomeHeader from "./components/HomeHeader";
import HomeStats from "./components/HomeStats";

export default function Home() {
  return (
    <Layout>
      <HomeHeader />
      <HomeStats />
    </Layout>
  );
}
