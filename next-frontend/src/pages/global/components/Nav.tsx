import Link from "next/link"
import {NavStyles} from '../styles/NavStyles';
import React from "react";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {SignOut} from "@/pages/user-authentication/components/SignOut";
import {useActiveCatalogSource} from "@/pages/catalog-source/hooks/useCurrentCatalogSource";

export const Nav: React.FC = () => {
    const user = useUser();
    const currentCatalogSource = useActiveCatalogSource()

    return (
        <NavStyles>
            {user && (
                <>
                    <Link href="/magento" className="text-white">
                        Magento
                    </Link>
                    <Link href="/catalog-source" className="text-white">
                        {currentCatalogSource?.name} System
                    </Link>
                    <Link href="/account">Account</Link>
                    <SignOut />
                </>)}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                </>
            )}
        </NavStyles>
    );
}