import Head from "next/head";
import {Account} from "@/pages/user-authentication/components/Account";

export default function AccountPage() {
    return (
        <>
            <Head>
                <title>Account</title>
                <meta name="description" content="Your account information" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Account />
            </main>
        </>
    );
}