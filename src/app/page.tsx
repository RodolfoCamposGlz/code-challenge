import Image from "next/image";
import Head from "next/head";
import HomeClient from "./pages/home";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Head>
        <title>Weather app</title>
        <meta
          name="description"
          content="Get the weather forecast in seconds."
        />
      </Head>
      <h1 className="text-5xl font-bold mb-14">Weather Forecast</h1>
      <HomeClient />
    </main>
  );
}
