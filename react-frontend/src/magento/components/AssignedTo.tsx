import MapStyle from '../../styles/MapStyle';
import MapStyleLinked from '../../styles/MapStyleLinked';
import MapStyleAwaitingLink from '../../styles/MapStyleAwaitingLink';
import {AssignedToData} from "../../types/keystone";

interface AssignedToProps {
    assignedTo: AssignedToData[],
    required: boolean
}

export const AssignedTo = ({assignedTo, required}: AssignedToProps) => {
    const getAssignedToAttribute = (assignedTo: AssignedToData[]): string => {
        return assignedTo.reduce((description ,assignedAttribute) => {
            if (description !=='') {
                description += ', '
            }
            return description += assignedAttribute.name;
        }, '');
    }

    return (
        <>
            {assignedTo.length>0 && (
                <MapStyleLinked><span>Linked to Pim with attribute {getAssignedToAttribute(assignedTo)}</span></MapStyleLinked>
            )}
            {assignedTo.length===0 && !required && (
                <MapStyle><span>Not Linked to Pim</span></MapStyle>
            )}
            {assignedTo.length===0  && required && (
                <MapStyleAwaitingLink><span>Link required for the import to work: <b>Awaiting link</b></span></MapStyleAwaitingLink>
            )}
        </>
    )
}