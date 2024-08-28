import Head from "next/head";
import {Magento} from "@/pages/magento/components";

export default function MagentoPage() {
    return (
        <>
            <Head>
                <title>Magento</title>
                <meta name="description" content="Magento Attributes" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Magento />
            </main>
        </>
    );
}