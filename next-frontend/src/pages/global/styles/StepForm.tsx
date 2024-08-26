import styled from "styled-components";

export const StepForm = styled.form`
    display: flex;
    .main {
        border: 1px solid var(--offWhite);
        box-shadow: var(--bs);
        margin: 1rem;
        padding: 0 1rem;
        width:100%;
    }
    .report {
        margin: 10px;
    }
  button {
      float: left;
      margin: 0 0px 0 10px;
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

