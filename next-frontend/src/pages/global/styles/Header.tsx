import styled from "styled-components";

export const Logo = styled.h1`
    font-size: 2rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    background: linear-gradient(44deg,var(--red) 30%,rgb(249,249,249) 97%);
    transform: skew(-4deg);
    a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        &:hover,
        &:focus {
            text-decoration:none;
        }
    }
    &:hover,
    &:focus {
        background: linear-gradient(44deg,var(--gray) 30%,rgb(249,249,249) 97%);
    }
`;

export const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
      margin-bottom: 50px;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;