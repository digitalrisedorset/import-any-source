import styled from 'styled-components';

interface StyleProps {
    linked?: boolean;
}

export const MapStyleAwaitingLink = styled.div<StyleProps>`
    background: var(--red);
    border: 1px solid var(--red);
    box-shadow: var(--bs);
    margin: 2px 0;
    padding: 10px;
    font-size: x-small;
    font-style: italic;
    width:180px;
    height: 75px;
    color: white;
`;


