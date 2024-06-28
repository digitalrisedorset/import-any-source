import { useTypedSelector } from "../hooks/useTypedSelector";
import styled from "styled-components";
import {RenderFileDownload} from "./woocommerce/DownloadLink"

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

export function FlashMessages() {
    const { messages, downloadLink, messageType} = useTypedSelector((state) => state.flashMessages)

    return (
        <div className="floating-alerts">
            {messageType === 'error' && messages.map((msg, index) => {
                return (
                    <ErrorStyles key={index}>
                        <div className="alert alert-error text-center floating-alert shadow-sm">
                            {msg}
                            {downloadLink && RenderFileDownload(downloadLink)}
                        </div>
                    </ErrorStyles>
                )
            })}

            {messageType === 'success' && messages.map((msg, index) => {
                return (
                    <SuccessStyles key={index}>
                        <div className="alert alert-success text-center floating-alert shadow-sm">
                            {msg}
                            {downloadLink && RenderFileDownload(downloadLink)}
                        </div>
                    </SuccessStyles>
                )
            })}
        </div>
    )
}
