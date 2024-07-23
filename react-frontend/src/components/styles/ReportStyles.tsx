import styled from 'styled-components';

interface StyleProps {

}

export const ReportStyles = styled.div<StyleProps>`
  position: relative;
    padding:20px 10px;
    width: 35%;
    bottom:15px
`;

export const Title = styled.span`
  margin: 0;
  margin-top: 0rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  
    background: var(--red);
    display: inline;
    font-size: 1.5rem;
    color: white;
    padding: 0.1rem 0.6rem;
  
`;
