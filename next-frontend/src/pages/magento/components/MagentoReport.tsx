import {Title, ReportStyles} from "../../global/styles/ReportStyles";
import React from "react";

export const MagentoReport: React.FC = (magentoAttributes: number) => {
    const ImportedMessage = () => {
        let message = ''
        if (magentoAttributes === 0) {
            message = message.concat(`no attributes were imported from Magento`)
        } else {
            message = message.concat(`${magentoAttributes} attributes were imported from Magento`)
        }

        return <p>{message}</p>
    }

    return (
        <ReportStyles>
            <div className="report">
                <Title>Magento attributes</Title>
                <span className="type">{ImportedMessage()}</span>
            </div>
        </ReportStyles>
)
}