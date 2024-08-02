import styled from "styled-components";

export const TabStyles = styled.ul`
    li {
        &.active {
            color: var(--red)
        },
        &.complete {
            color: var(--lightGrey);
        }
    }
  margin: 0 0 0 40px;
  padding: 0;
  display: flex;
    list-style: none;
  justify-self: end;
  font-size: 2rem;
  .link,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
      color: var(--black)
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      content: '';
      width: 2px;
      background: var(--lightGrey);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: var(--red);
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid var(--lightGrey);
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }

    @-webkit-keyframes blinker {
        from { opacity: 1.0; }
        to { opacity: 0.0; }
    }

    .monitoring-warning {
        -webkit-animation-name: blinker;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);
        -webkit-animation-duration: 1.7s;
        color: var(--red);
        margin-top: 5px;
        line-height: 1.3em;
        font-size: medium;
    }
`;

export const TabContainer = styled.div`
      display: flex;
      flex-direction: column;
      font-size: 2rem;
      width: 100%;
        border: 1px solid var(--offWhite);
        box-shadow: var(--bs);
`;

export const TabContentElt = styled.div`
    padding: 1rem;
    min-height: 25rem;
    border: 2px solid var(--text-color);    
`;