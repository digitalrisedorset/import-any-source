import {useActiveCatalogSource} from "../hooks/useCurrentCatalogSource";
import {ReportStyles, Title} from "../../global/styles/ReportStyles";

export const CatalogSourceSystemReport: React.FC = () => {
    const currentCatalogSource = useActiveCatalogSource()

    const ImportedMessage = () => {
        let message = ''
        if (currentCatalogSource?.numberCatalogSourceAttributes === 0) {
            message = message.concat(`no attributes were imported`)
        } else {
            message = message.concat(`${currentCatalogSource?.numberCatalogSourceAttributes} attributes were imported`)
        }

        return <p>{message}</p>
    }

    const IgnoredMessage = () => {
        if (currentCatalogSource?.numberCatalogSourceAttributes === 0) {
            return ''
        }
        let message = ''
        if (currentCatalogSource?.ignoredAttributes === 0) {
            message = message.concat(`all attributes are active`)
        } else {
            message = message.concat(`${currentCatalogSource?.ignoredAttributes} attributes are setup as ignored`)
        }

        return <p>{message}</p>
    }

    return (
        <ReportStyles>
            <div className="report">
                <Title>{currentCatalogSource.name} attributes</Title>
                <span className="type">{ImportedMessage()}</span>
                <span className="type">{IgnoredMessage()}</span>
            </div>
        </ReportStyles>)
        }