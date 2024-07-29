import styled from 'styled-components';

interface StyleProps {
    linked?: boolean;
}

const MapStyleLinked = styled.div<StyleProps>`
    background: #cdf2e2;
    border: 1px solid var(--offWhite);
    box-shadow: var(--bs);
    margin: 2px 0;
    padding: 10px;
    font-size: x-small;
    font-style: italic;
    width:180px;
    height: 75px;
`;

export default MapStyleLinked;
