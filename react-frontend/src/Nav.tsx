import { Link } from "react-router-dom"
import NavStyles from './components/styles/NavStyles';
import {useTypedSelector} from "./hooks/useTypedSelector";
import {PimSystemHandler} from "./models/PimSystem";

export default function Nav() {
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
    const pimSystemHandler = new PimSystemHandler()

    return (
        <NavStyles>
           {/* <Link to="/sickfits" className="text-white">
                Sick Fits
            </Link>*/}
            <Link to="/magento" className="text-white">
                Magento
            </Link>
            <Link to="/pim" className="text-white">
                {pimSystemHandler.getActiveSystemLabel(pimSystemCode)} System
            </Link>
        </NavStyles>
    );
}