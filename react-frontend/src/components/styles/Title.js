import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: 0rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: var(--red);
    display: inline;
    font-size: 1.5rem;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;
