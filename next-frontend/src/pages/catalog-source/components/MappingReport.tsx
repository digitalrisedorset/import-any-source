import {useMappingRemaining} from "../../mapping/hooks/useMappingVerifier";
import {ReportStyles, Title} from "../../global/styles/ReportStyles";
import {useActiveCatalogSource} from "../hooks/useCurrentCatalogSource";

export const MappingReport: React.FC = () => {
    const mappingRemaining = useMappingRemaining()
    const currentCatalogSource = useActiveCatalogSource()
    const ImportedMessage = () => {
        let message = ''
        if (mappingRemaining === 0) {
            message = message.concat(`All the mapping for the system ${currentCatalogSource.name} are done`)
        } else {
            message = message.concat(`${mappingRemaining} attributes mapping remain for ${currentCatalogSource.name}`)
        }

        return <p>{message}</p>
    }

    return (<ReportStyles>
        <div className="report">
            <Title>Mapping attributes</Title>
            <span className="type">{ImportedMessage()}</span>
        </div>
    </ReportStyles>
)
}