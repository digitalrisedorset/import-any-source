import styled from "styled-components";
import {Link} from "react-router-dom";

export const SuccessStyles = styled.div`
    position: absolute;
    z-index: 10;
  padding: 1rem;
  background: white;
  margin-top: 77px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 10px solid green;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

export const ErrorStyles = styled.div`
    position: absolute;
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 10px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

export const AnimationStyles = styled.span`
    --toggler-width: 100%;
    --menu-width: 600px;
    --menu-bg-color: white;
    --toggler-bg-color: lightcream;
    

    .display-enter, .display-appear {
        width: var(--toggler-width);
        color: var(--fade-from-color);
        background-color:var(--toggler-bg-color);
    }
    .display-enter-active, .display-appear-active {
        width: var(--menu-width);
        color: var(--fade-to-color);
        background-color: var(--menu-bg-color);
        transition: all 8s;
    }
`;

export const DownloadLink = styled(Link)`
  font-style: italic;
    color: green;
    margin-left: 10px;
`;