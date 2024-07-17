import { useTypedSelector } from "../hooks/useTypedSelector";
import { RenderFileDownload } from "./pim/DownloadLink"
import { SuccessStyles, ErrorStyles, AnimationStyles} from "./styles/FlashMessage"
import React, {useEffect, useState} from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MINUTE_MS = 5000;

export function FlashMessages() {
    const { messages, downloadLink, messageType} = useTypedSelector((state) => state.flashMessages)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        setHidden(false)
        const interval = setInterval(async () => {
            setHidden(true)
        }, MINUTE_MS);

        return () => clearInterval(interval)
    }, [messages])

    return (
        <>
            {!hidden && <AnimationStyles>
                <TransitionGroup>
                    <CSSTransition
                        in={hidden}
                        timeout={MINUTE_MS}
                        classNames="display"
                        unmountOnExit
                        appear
                    >
                        <>
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
                        </>
                    </CSSTransition>
                </TransitionGroup>
            </AnimationStyles>}
        </>
    )
}
