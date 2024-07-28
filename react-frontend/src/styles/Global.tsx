import {createGlobalStyle} from "styled-components";
import {ThemeColors} from "../config";

interface StyleProps {
    colors: ThemeColors;
}

export const GlobalStyles = createGlobalStyle<StyleProps>`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
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
    --offWhite: #E4E4DE;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
      position: relative;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
    button {
        font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background: var(--red);
        color: white;
        font-weight: 300;
        border: 0;
        border-radius: 0;
        text-transform: uppercase;
        font-size: 1.5rem;
        padding: 0.8rem 1.5rem;
        transform: skew(-1deg);
        display: inline-block;
        transition: all 0.5s;
        margin: 10px 0;
        &[disabled] {
            opacity: 0.5;
        }
    }
`;