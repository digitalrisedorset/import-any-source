import { Link } from "react-router-dom"
import styled from "styled-components";
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
    padding: 5px 20px;
  position: relative;
  z-index: 2;
  background: red;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

interface headerProps {
    title: string
}

export default function Header($props: headerProps): JSX.Element {
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