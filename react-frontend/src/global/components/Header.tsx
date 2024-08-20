import {Link} from "react-router-dom"
import {Nav} from './Nav';
import {Logo, HeaderStyles} from '../styles/Header'
import React from "react";

export const Header: React.FC = () => {
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