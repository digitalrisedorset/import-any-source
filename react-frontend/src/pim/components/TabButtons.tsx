import {StepData} from '../types/step'
import {TabStyles} from '../../global/styles/TabButtonsStyle'
import {useProductImport} from "../hooks/useProductImport";

type TabsButtonProps = {
    stepData: StepData,
    activeTab: number,
    setActiveTab: any
}

export default function TabButtons({ stepData, activeTab, setActiveTab }: TabsButtonProps) {
    const {importMonitored} = useProductImport()

    const getTabClassname = (index: number): string => {
        if (index === activeTab) {
            return "active"
        }

        if (index < activeTab) {
            return 'complete'
        }

        return ''
    }

    return (
        <TabStyles>
            {stepData.map((item, index) => (
                <li
                    className={getTabClassname(index)}
                    key={item.step}
                    onClick={() => setActiveTab(index)}
                >
                    <span className="link">{item.step}</span>
                </li>
            ))}
            {importMonitored && <span className="monitoring-warning">The import is being monitored</span>}
        </TabStyles>
    );
}