import {Link} from "react-router-dom"
import {NavStyles} from '../styles/NavStyles';
import {useActiveCatalogSource} from "../../catalog-source/hooks/useCurrentCatalogSource";
import {useUser} from "../../user-authentication/hooks/useUser"
import {SignOut} from "../../user-authentication/components/SignOut";
import React from "react";

export const Nav: React.FC = () => {
    const user = useUser();
    const currentCatalogSource = useActiveCatalogSource()

    return (
        <NavStyles>
            {user && (
                <>
                    <Link to="/magento" className="text-white">
                        Magento
                    </Link>
                    <Link to="/catalog-source" className="text-white">
                        {currentCatalogSource?.name} System
                    </Link>
                    <Link to="/config" className="text-white">
                        Configuration
                    </Link>
                    <Link to="/account">Account</Link>
                    <SignOut />
            </>)}
            {!user && (
                <>
                    <Link to="/signin">Sign In</Link>
                </>
            )}
        </NavStyles>
    );
}