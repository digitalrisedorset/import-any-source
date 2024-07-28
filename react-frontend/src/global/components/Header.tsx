import {Link} from "react-router-dom"
import {Nav} from './Nav';
import {Logo, HeaderStyles} from '../../styles/Header'

interface headerProps {
    title: string
}

export const Header = ($props: headerProps) => {
    return (
        <HeaderStyles>
            <div className="bar">
                <Logo>
                    <Link to="/">Import From Any Source</Link>
                </Logo>
                <Nav />
            </div>
        </HeaderStyles>
    );
}