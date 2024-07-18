import styled from 'styled-components';

interface StyleProps {
  ignored?: boolean;
}

export const MappingScreen = styled.div<StyleProps>`
    border: 1px solid var(--offWhite);
    position: relative;
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

export const ImportHome = styled.div`
    display: flex;
    .steps {
        border: 1px solid var(--offWhite);
        box-shadow: var(--bs);
        margin: 1rem;
        width:53%;
    }
    form {
        margin: 10px;
    }
`;

export const MonitoringArea = styled.div<StyleProps>`
    margin: 1rem;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  width:46%;
`;

export const DeleteButton = styled.button`
  background: black;
  color: white;
  font-size: 8px;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
    bottom:0;
    padding:4px 8px;
`;