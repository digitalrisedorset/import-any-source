import styled from 'styled-components';

export const Title = styled.span`
  margin: 0;
  margin-top: 0rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: var(--red);
    display: inline;
    font-size: 1.5rem;
    color: white;
    padding: 0.1rem 0.6rem;
  }
`;

export const IgnoreTitle = styled.span`
  margin: 0 1rem;
  margin-top: 0rem;
  a {
    display: inline;
    font-size: 1rem;
  }
`;