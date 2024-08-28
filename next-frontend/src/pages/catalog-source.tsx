import Head from "next/head";
import {CatalogSource} from "@/pages/catalog-source/components";

export default function CatalogSourcePage() {
    return (
        <>
            <Head>
                <title>Catalog Source</title>
                <meta name="description" content="Catalog Source Attribute" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <CatalogSource />
            </main>
        </>
    );
}