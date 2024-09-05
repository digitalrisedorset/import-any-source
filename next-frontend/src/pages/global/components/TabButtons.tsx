import {StepData} from '../../catalog-source/types/step'
import {TabStyles} from '../styles/TabButtonsStyle'
import {useProductImport} from "../../catalog-source/hooks/useProductImport";
import {useAccess} from "@/pages/user-authentication/hooks/useAccess";
import {Dispatch, SetStateAction} from "react";

type TabsButtonProps = {
    stepData: StepData,
    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}

type MonitoringgProps = {
    canDeleteProducts: boolean,
    canUpdateProducts: boolean
}

const RenderMonitoring: React.FC<MonitoringgProps> = ({canDeleteProducts, canUpdateProducts}: MonitoringgProps) => {
    const notificationActive = (): string => {
        let result = []
        if (canUpdateProducts) result.push('update notification active')
        if (canDeleteProducts) result.push('delete notification active')

        if (result.length>0) {
            return `(${result.join(', ')})`
        }

        return ''
    }

    return (
        <>
            <span className="monitoring-warning">The import is being monitored <br/>{notificationActive()}</span>
        </>
    )
}

export const TabButtons: React.FC<TabsButtonProps> = ({ stepData, activeTab, setActiveTab }: TabsButtonProps) => {
    const {importMonitored} = useProductImport()
    const {canDeleteProducts, canUpdateProducts} = useAccess()

    const getTabClassname = (index: number): string => {
        if (index === activeTab) {
            return 'active'
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
            {importMonitored && RenderMonitoring({canDeleteProducts, canUpdateProducts})}
        </TabStyles>
    );
}