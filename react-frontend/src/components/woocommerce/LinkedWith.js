import MapStyle from './../styles/MapStyle';

export default function LinkedWith({magentoCode}) {
    return (
        <MapStyle linked={magentoCode}>
            {magentoCode && (
                <span>Linked to Magento with attribute '{magentoCode.name}' (code: {magentoCode.code})</span>
            )}
            {!magentoCode && (
                <span>Not Linked to Magento</span>
            )}
        </MapStyle>
    )
}