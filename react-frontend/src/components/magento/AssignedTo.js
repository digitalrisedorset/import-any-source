import MapStyle from './../styles/MapStyle';

export default function AssignedTo({assignedTo}) {
    return (
        <MapStyle linked={assignedTo}>
            {assignedTo && (
                <span>Linked to Woocommerce with attribute '{assignedTo.name}' (code: {assignedTo.code})</span>
            )}
            {!assignedTo && (
                <span>Not Linked to Woocommerce</span>
            )}
        </MapStyle>
    )
}