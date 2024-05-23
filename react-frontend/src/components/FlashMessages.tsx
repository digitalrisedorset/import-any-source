import { useTypedSelector } from "../hooks/useTypedSelector";
import styled from "styled-components";

const SuccessStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 10px solid green;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 10px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

export function FlashMessages(): JSX.Element {
    const { messages, messageType} = useTypedSelector((state) => state.flashMessages)

    return (
        <div className="floating-alerts">
            {messageType == 'error' && messages.map((msg, index) => {
                return (
                    <ErrorStyles key={index}>
                        <div className="alert alert-error text-center floating-alert shadow-sm">
                            {msg}
                        </div>
                    </ErrorStyles>
                )
            })}

            {messageType == 'success' && messages.map((msg, index) => {
                return (
                    <SuccessStyles key={index}>
                        <div className="alert alert-success text-center floating-alert shadow-sm">
                            {msg}
                        </div>
                    </SuccessStyles>
                )
            })}
        </div>
    )
}
