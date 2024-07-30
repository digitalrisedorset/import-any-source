import {StepData} from '../types/step'
import {TabStyles} from '../../global/styles/TabButtonsStyle'

type TabsButtonProps = {
    stepData: StepData,
    activeTab: number,
    setActiveTab: any
}

export default function TabButtons({ stepData, activeTab, setActiveTab  }: TabsButtonProps) {
    return (
        <TabStyles>
            {stepData.map((item, index) => (
                <li
                    className={`${index === activeTab && "active"} tab__button`}
                    key={item.step}
                    onClick={() => setActiveTab(index)}
                >
                    <a>{item.step}</a>
                </li>
            ))}
        </TabStyles>
    );
}