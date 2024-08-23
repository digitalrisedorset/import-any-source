import styled, {createGlobalStyle} from "styled-components";
import {ThemeColors} from "@/config";

interface StyleProps {
    colors: ThemeColors;
}

export const GlobalStyles = createGlobalStyle<StyleProps>`
    @font-face {
        font-weight: normal;
        font-style: normal;
    }
    html {
        color: ${(props: StyleProps): string => props.colors.font?props.colors.font:'#595f39' };
          --red: ${(props: StyleProps): string => props.colors.deep?props.colors.deep:'#595f39' };
          --black:  ${(props: StyleProps): string => props.colors.normal?props.colors.normal:'#1B1B1B' };
          --grey: ${(props: StyleProps): string => props.colors.light?props.colors.light:'#C4C5BA' };
        --gray: var(--grey);
        --lightGrey: #e1e1e1;
        --lightGray: var(--lightGrey);
        --offWhite: #ededed;
        --maxWidth: 1000px;
        --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height:2;
    }
    a {
        text-decoration: none;
        color: var(--black);
    }
    a:hover {
        text-decoration: underline;
    }
    button {
        font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

export const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;