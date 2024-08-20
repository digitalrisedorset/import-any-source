import {MapStyle} from '../../catalog-source/styles/MapStyle';
import {MapStyleLinked} from '../../catalog-source/styles/MapStyleLinked';
import {MapStyleAwaitingLink} from '../../catalog-source/styles/MapStyleAwaitingLink';
import {AssignedToData} from "../../types/keystone";
import React from "react";

interface AssignedToProps {
    assignedTo: AssignedToData[],
    required: boolean
}

export const AssignedTo: React.FC<AssignedToProps> = ({assignedTo, required}: AssignedToProps) => {
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
                <MapStyleLinked><span>Linked to CatalogSource with attribute {getAssignedToAttribute(assignedTo)}</span></MapStyleLinked>
            )}
            {assignedTo.length===0 && !required && (
                <MapStyle><span>Not Linked to CatalogSource</span></MapStyle>
            )}
            {assignedTo.length===0  && required && (
                <MapStyleAwaitingLink><span>Link required for the import to work: <b>Awaiting link</b></span></MapStyleAwaitingLink>
            )}
        </>
    )
}