import styled from "styled-components";

const StepForm = styled.form`
  button {
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default StepForm;