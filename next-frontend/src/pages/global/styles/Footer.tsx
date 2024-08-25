import styled from "styled-components";

export const FooterStyle = styled.footer`
  .bar {
    border-top: 3px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
      margin-bottom: 50px;
      text-align: right;
      padding: 10px 15px;
  }
`;