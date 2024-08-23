import {TabContentElt, TabContainer} from '../../global/styles/TabButtonsStyle'
import {StepData} from '../types/step'

type TabsButtonProps = {
    stepData: StepData,
    activeTab: number
}
export const TabContent: React.FC<TabsButtonProps> = ({ stepData, activeTab}: TabsButtonProps) => {
    return (
        <TabContainer>
            <TabContentElt>
                {stepData[activeTab].component}
            </TabContentElt>
        </TabContainer>
    );
}