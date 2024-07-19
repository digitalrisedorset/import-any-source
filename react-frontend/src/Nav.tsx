import { Link } from "react-router-dom"
import NavStyles from './components/styles/NavStyles';
import {useCurrentPimSystem} from "./hooks/useCurrentPimSystem";

export default function Nav() {
    const currentPimSystem = useCurrentPimSystem()

    return (
        <NavStyles>
           {/* <Link to="/sickfits" className="text-white">
                Sick Fits
            </Link>*/}
            <Link to="/magento" className="text-white">
                Magento
            </Link>
            <Link to="/pim" className="text-white">
                {currentPimSystem} System
            </Link>
            <Link to="/config" className="text-white">
                Configuration
            </Link>
        </NavStyles>
    );
}