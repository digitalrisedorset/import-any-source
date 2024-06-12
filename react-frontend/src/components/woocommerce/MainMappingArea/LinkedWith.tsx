import MapStyle from '../../styles/MapStyle';
import MapStyleLinked from '../../styles/MapStyleLinked';


interface AttributeProps {
    magentoCode: { name: string; code: string; }
}

export function LinkedWith({magentoCode}: AttributeProps): JSX.Element {
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