import {useMappingRemaining} from "../../mapping/hooks/useMappingVerifier";
import {ReportStyles, Title} from "../../styles/ReportStyles";
import {useActivePimSystem} from "../hooks/useCurrentPimSystem";

export const MappingReport = () => {
    const mappingRemaining = useMappingRemaining()
    const currentPimSystem = useActivePimSystem()
    const ImportedMessage = () => {
        let message = ''
        if (mappingRemaining === 0) {
            message = message.concat(`All the mapping for the system ${currentPimSystem.name} are done`)
        } else {
            message = message.concat(`${mappingRemaining} attributes mapping remain for ${currentPimSystem.name}`)
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