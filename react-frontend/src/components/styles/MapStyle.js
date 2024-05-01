import styled from 'styled-components';

const MapStyle = styled.div`
    background: ${props => props.linked?'#cdf2e2':'white'};
    border: 1px solid var(--offWhite);
    box-shadow: var(--bs);
    margin: 2px 0;
    padding: 10px;
    font-size: x-small;
    font-style: italic;
    width:180px;
    height: 75px;
`;

export default MapStyle;
