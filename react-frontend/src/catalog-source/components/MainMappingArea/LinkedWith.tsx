import {MapStyle} from '../../styles/MapStyle';
import {MapStyleLinked} from '../../styles/MapStyleLinked';
import React from "react";

interface AttributeProps {
    magentoCode: { name: string; code: string; }
}

export const LinkedWith: React.FC<AttributeProps> = ({magentoCode}: AttributeProps) => {
    return (<>
        {magentoCode && (
            <MapStyleLinked><span>Linked to Magento with attribute '{magentoCode.name}' (code: {magentoCode.code})</span></MapStyleLinked>
        )}
        {!magentoCode && (
            <MapStyle><span>Not Linked to Magento</span></MapStyle>
        )}
        </>
    )
}