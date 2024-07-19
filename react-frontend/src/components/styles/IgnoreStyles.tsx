import styled from 'styled-components';

interface StyleProps {
    required?: boolean;
}

export const IgnoreStyles = styled.div<StyleProps>`
  background: ${(props: StyleProps): string => props.required?'#FEEBEB':'white' };
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
    float: left;
    margin: 2px;
    padding: 0px 5px 5px;
    width: 200px;
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
`;

export const ActivateButton = styled.button`
  background: black;
  color: white;
  font-size: 8px;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 5px;
    padding:4px 6px;
`;