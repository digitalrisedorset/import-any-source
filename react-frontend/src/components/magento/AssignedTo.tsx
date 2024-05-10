import MapStyle from './../styles/MapStyle';

interface AssignedTo {
    code: string;
    name: string;
}

export default function AssignedTo() {
    return (
        <MapStyle >
            {/*{assignedTo && (
                <span>Linked to Woocommerce with attribute '{assignedTo.name}' (code: {assignedTo.code})</span>
            )}
            {!assignedTo && (
                <span>Not Linked to Woocommerce</span>
            )}*/}
        </MapStyle>
    )
}