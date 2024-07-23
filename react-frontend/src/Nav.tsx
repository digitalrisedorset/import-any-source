import {Link} from "react-router-dom"
import NavStyles from './components/styles/NavStyles';
import {useActivePimSystem} from "./hooks/useCurrentPimSystem";

export const Nav = () => {
    const currentPimSystem = useActivePimSystem()

    return (
        <NavStyles>
           {/* <Link to="/sickfits" className="text-white">
                Sick Fits
            </Link>*/}
            <Link to="/magento" className="text-white">
                Magento
            </Link>
            <Link to="/pim" className="text-white">
                {currentPimSystem?.name} System
            </Link>
            <Link to="/config" className="text-white">
                Configuration
            </Link>
        </NavStyles>
    );
}