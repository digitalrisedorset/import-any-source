import MapStyle from './../styles/MapStyle';
import MapStyleLinked from './../styles/MapStyleLinked';
import {AssignedToData} from "../../types";

interface AssignedToProps {
    assignedTo: AssignedToData
}

export function AssignedTo({assignedTo}: AssignedToProps) {
    return (
        <>
            {assignedTo && (
                <MapStyleLinked><span>Linked to Woocommerce with attribute '{assignedTo.name}' (code: {assignedTo.code})</span></MapStyleLinked>
            )}
            {!assignedTo && (
                <MapStyle><span>Not Linked to Woocommerce</span></MapStyle>
            )}
        </>
    )
}