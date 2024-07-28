import {Link} from "react-router-dom"
import NavStyles from './components/styles/NavStyles';
import {useActivePimSystem} from "./hooks/useCurrentPimSystem";
import {useUser} from "./hooks/useUser"
import SignOut from "./components/signin/SignOut";

export const Nav = () => {
    const user = useUser();
    const currentPimSystem = useActivePimSystem()

    return (
        <NavStyles>
            {user && (
                <>
                    <Link to="/magento" className="text-white">
                        Magento
                    </Link>
                    <Link to="/pim" className="text-white">
                        {currentPimSystem?.name} System
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