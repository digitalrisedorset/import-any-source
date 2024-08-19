import {Link} from "react-router-dom"
import {Nav} from './Nav';
import {Logo, HeaderStyles} from '../styles/Header'
import React from "react";

type HeaderProps = {
    title: string
}

export const Header: React.FC<HeaderProps> = ({title}: HeaderProps) => {
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