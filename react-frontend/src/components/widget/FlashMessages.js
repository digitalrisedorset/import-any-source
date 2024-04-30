import React, { useEffect, useContext } from "react"
import styled from "styled-components";
import DispatchContext from "../../DispatchContext";

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

function FlashMessages(props) {
  const appDispatch = useContext(DispatchContext)

  useEffect(() => {
    async function flushMessage() {
      try {
        appDispatch({ type: "clearMessage"})
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    flushMessage()
    return () => {

    }
  }, [])

  return (
    <div className="floating-alerts">
      {props.messageType == 'error' && props.messages.map((msg, index) => {
        return (
            <ErrorStyles>
              <div key={index} className="alert alert-error text-center floating-alert shadow-sm">
                {msg}
              </div>
            </ErrorStyles>
        )
      })}

      {props.messageType == 'success' && props.messages.map((msg, index) => {
        return (
            <SuccessStyles>
              <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
                {msg}
              </div>
            </SuccessStyles>
        )
      })}
    </div>
  )
}

export default FlashMessages
