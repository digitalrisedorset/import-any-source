import {StepData} from '../types/step'
import {TabStyles} from '../../global/styles/TabButtonsStyle'
import {useProductImport} from "../hooks/useProductImport";
import {useAccess} from "../../configuration/hooks/useAccess";

type TabsButtonProps = {
    stepData: StepData,
    activeTab: number,
    setActiveTab: any
}

const RenderMonitoring = (canDeleteProducts: boolean, canUpdateProducts: boolean) => {
    const notificationActive = () => {
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

export default function TabButtons({ stepData, activeTab, setActiveTab }: TabsButtonProps) {
    const {importMonitored} = useProductImport()
    const {canDeleteProducts, canUpdateProducts} = useAccess()

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
            {importMonitored && RenderMonitoring(canDeleteProducts, canUpdateProducts)}
        </TabStyles>
    );
}