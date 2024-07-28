import {useActivePimSystem} from "../hooks/useCurrentPimSystem";
import {ReportStyles, Title} from "../../styles/ReportStyles";

export const PimSystemReport = () => {
    const currentPimSystem = useActivePimSystem()

    const ImportedMessage = () => {
        let message = ''
        if (currentPimSystem?.pimAttributes === 0) {
            message = message.concat(`no attributes were imported`)
        } else {
            message = message.concat(`${currentPimSystem?.pimAttributes} attributes were imported`)
        }

        return <p>{message}</p>
    }

    const IgnoredMessage = () => {
        if (currentPimSystem?.pimAttributes === 0) {
            return ''
        }
        let message = ''
        if (currentPimSystem?.ignoredAttributes === 0) {
            message = message.concat(`all attributes are active`)
        } else {
            message = message.concat(`${currentPimSystem?.ignoredAttributes} attributes are setup as ignored`)
        }

        return <p>{message}</p>
    }

    return (
        <ReportStyles>
            <div className="report">
                <Title>{currentPimSystem.name} attributes</Title>
                <span className="type">{ImportedMessage()}</span>
                <span className="type">{IgnoredMessage()}</span>
            </div>
        </ReportStyles>)
        }