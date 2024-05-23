import { Link } from "react-router-dom"
import NavStyles from './components/styles/NavStyles';

export default function Nav(): JSX.Element {
    return (
        <NavStyles>
            <Link to="/magento" className="text-white">
                Magento
            </Link>
            <Link to="/woocommerce" className="text-white">
                Woocommerce
            </Link>
            <Link to="/mapping" className="text-white">
                Mapping
            </Link>
        </NavStyles>
    );
}