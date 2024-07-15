import styled from 'styled-components';

const AwaitingLinkStyle = styled.div`
    position: absolute;
    background: white;
    border: 1px solid var(--offWhite);
    box-shadow: var(--bs);
    margin: 2px 0;
    padding: 10px;
    font-size: x-small;
    font-style: italic;
    width:380px;
    height: 68px;
    right: 5rem;
    top: 5px;
    h2 {
        margin-bottom: 20px;
    }
`;

export default AwaitingLinkStyle;
