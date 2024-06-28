import { Link } from "react-router-dom"
import NavStyles from './components/styles/NavStyles';

export default function Nav() {
    return (
        <NavStyles>
           {/* <Link to="/sickfits" className="text-white">
                Sick Fits
            </Link>*/}
            <Link to="/magento" className="text-white">
                Magento
            </Link>
            <Link to="/woocommerce" className="text-white">
                Woocommerce
            </Link>
        </NavStyles>
    );
}