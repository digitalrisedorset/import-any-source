import Head from "next/head";
import {Import} from "@/pages/catalog-source/components/Import";

export default function Home() {
  return (
    <>
      <Head>
        <title>Import Dashboard</title>
        <meta name="description" content="Import Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Import />
      </main>
    </>
  );
}
