import MapStyle from './../styles/MapStyle';
import MapStyleLinked from './../styles/MapStyleLinked';
import MapStyleAwaitingLink from './../styles/MapStyleAwaitingLink';
import {AssignedToData} from "../../types/keystone";

interface AssignedToProps {
    assignedTo: AssignedToData,
    required: boolean
}

export function AssignedTo({assignedTo, required}: AssignedToProps) {
    return (
        <>
            {assignedTo && (
                <MapStyleLinked><span>Linked to Pim with attribute '{assignedTo.name}' (code: {assignedTo.code})</span></MapStyleLinked>
            )}
            {!assignedTo && !required && (
                <MapStyle><span>Not Linked to Pim</span></MapStyle>
            )}
            {!assignedTo  && required && (
                <MapStyleAwaitingLink><span>Link required for the import to work: <b>Awaiting link</b></span></MapStyleAwaitingLink>
            )}
        </>
    )
}