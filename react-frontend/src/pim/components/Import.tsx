import {ImportHome} from '../../global/styles/MappingScreen';
import {useAccess} from "../../configuration/hooks/useAccess";
import TabButtons from "./TabButtons";
import TabContent from "./TabContent";
import { useState} from "react";
import {StepDataReader} from "../../global/models/StepDataReader";
import {TabContainer} from "../../global/styles/TabButtonsStyle";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../user-authentication/hooks/useUser";

export const Import = () => {
    const stepDataReader = new StepDataReader()
    const [activeTab, setActiveTab] = useState(0);
    const stepData = stepDataReader.getImportStep();
    const {canSetupImport} = useAccess()
    const navigate = useNavigate()
    const user = useUser()


    if (!user) {
        navigate('/signin')
    }

    return (
        <ImportHome>
            {canSetupImport &&
            <TabContainer>
                <TabButtons
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    stepData={stepData}
                />
                <TabContent stepData={stepData} activeTab={activeTab} />
            </TabContainer>
            }
        </ImportHome>
    )
}