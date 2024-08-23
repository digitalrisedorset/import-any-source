import Link from "next/link"
import {Nav} from './Nav';
import {Logo, HeaderStyles} from '../styles/Header'
import React from "react";

export const Header: React.FC = () => {
    return (
        <HeaderStyles>
            <div className="bar">
                <Logo>
                    <Link href="/">Import From Any Source</Link>
                </Logo>
                <Nav />
            </div>
        </HeaderStyles>
    );
}