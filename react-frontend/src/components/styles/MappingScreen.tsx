import styled from 'styled-components';

interface StyleProps {
    ignored?: boolean;
}

export const MappingScreen = styled.div<StyleProps>`
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
    display: flex;
    .fields {
        width:85%
    }
`;

export const MappingIgnoredArea = styled.div<StyleProps>`
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
    width:15%;
    margin-top:110px;
`;

