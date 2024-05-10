import MapStyle from './../styles/MapStyle';

interface AttributeProps {
    magentoCode: { name: string; code: string; }
}

export function LinkedWith({magentoCode}: AttributeProps) {
    return (
        <MapStyle>
            {magentoCode && (
                <span>Linked to Magento with attribute '{magentoCode.name}' (code: {magentoCode.code})</span>
            )}
            {!magentoCode && (
                <span>Not Linked to Magento</span>
            )}
        </MapStyle>
    )
}