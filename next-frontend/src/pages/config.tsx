import Head from "next/head";
import {Config} from "@/pages/configuration/components/Config";

export default function ConfigurationPage() {
    return (
        <>
            <Head>
                <title>Configuration</title>
                <meta name="description" content="System Configuration" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Config />
            </main>
        </>
    );
}