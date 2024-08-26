import { RenderFileDownload } from "../../catalog-source/components/DownloadLink"
import { SuccessStyles, ErrorStyles, AnimationStyles} from "../styles/FlashMessage"
import React, {useEffect, useRef, useState} from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {useAppSelector} from "@/state/store";
import {useActions} from "@/pages/global/hooks/useActions";

const MINUTE_MS = 5000;

export const FlashMessages: React.FC = () => {
    const { messages, downloadLink, messageType} = useAppSelector((state) => state.flashMessage)
    const [hidden, setHidden] = useState<boolean>(false)
    const { clearFlashMessage } = useActions()

    const flashNodeRef = useRef(null)

    useEffect(() => {
        setHidden(false)
        const interval = setInterval(async () => {
            setHidden(true)
            clearFlashMessage()
        }, MINUTE_MS);

        return () => clearInterval(interval)
    }, [messages])

    return (
        <>
            {!hidden && <AnimationStyles>
                <TransitionGroup>
                    <CSSTransition
                        in={hidden}
                        nodeRef={flashNodeRef}
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
