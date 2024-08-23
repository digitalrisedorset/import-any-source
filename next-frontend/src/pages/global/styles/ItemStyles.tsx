import styled from 'styled-components';

interface StyleProps {
    required?: boolean;
}

export const ItemStyles = styled.div<StyleProps>`
  background: ${(props: StyleProps): string => props.required?'#FEEBEB':'white' };
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
    float: left;
    margin: 5px;
    padding: 0px 8px 5px;
    width: 300px;
    .date-created {
        font-style: italic;
        text-align: right;
        position: absolute;
        bottom: 35px;
        right: 0.5em;
        width: 90px;
        font-size: x-small;
    }
    .type {
        position: absolute;
        top:5px;
        right: 5px;
        font-size: x-small;
        text-transform: lowercase;
        border: 1px solid var(--offWhite);
        box-shadow: var(--bs);
        padding: 0px 7px;
        background: white;
    }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid var(--lightGrey);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: var(--lightGrey);
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;
