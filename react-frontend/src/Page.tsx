import {createGlobalStyle} from "styled-components";

interface PageProps {
    children: any
}

const GlobalStyles = createGlobalStyle`
    html {
    }
    body {
        position: relative;
    }
    button {
        background: var(--red);
        color: white;
        font-weight: 500;
        border: 0;
        border-radius: 0;
        text-transform: uppercase;
        font-size: 1.5rem;
        padding: 0.8rem 1.5rem;
        transform: skew(-2deg);
        display: inline-block;
        transition: all 0.5s;
        margin: 10px 0;
        &[disabled] {
            opacity: 0.5;
        }
    }
`;

export function Page({ children }: PageProps) {
    return (
        <body>
            <GlobalStyles />
            {children}
        </body>
    )
}