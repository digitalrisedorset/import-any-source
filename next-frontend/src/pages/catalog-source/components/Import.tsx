import {ImportHome} from '../../global/styles/MappingScreen';
import {TabButtons} from "../../global/components/TabButtons";
import {TabContent} from "../../global/components/TabContent";
import {useState} from "react";
import {StepDataReader} from "../../global/models/StepDataReader";
import {TabContainer} from "../../global/styles/TabButtonsStyle";
import {useAccess} from "@/pages/user-authentication/hooks/useAccess";

export const Import: React.FC = () => {
    const stepDataReader = new StepDataReader()
    const [activeTab, setActiveTab] = useState<number>(0);
    const stepData = stepDataReader.getImportStep();
    const {canSetupImport} = useAccess()

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