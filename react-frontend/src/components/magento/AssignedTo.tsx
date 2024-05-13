import MapStyle from './../styles/MapStyle';
import {AssignedToData} from "../../types";

interface AssignedToProps {
    assignedTo: AssignedToData
}

export function AssignedTo({assignedTo}: AssignedToProps) {
    return (
        <MapStyle >
            {assignedTo && (
                <span>Linked to Woocommerce with attribute '{assignedTo.name}' (code: {assignedTo.code})</span>
            )}
            {!assignedTo && (
                <span>Not Linked to Woocommerce</span>
            )}
        </MapStyle>
    )
}