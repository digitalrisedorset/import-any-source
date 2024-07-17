import { Attribute } from "./Attribute";
import GridStyles from "../../styles/GridStyles";
import {PimAttribute} from '../../../types/keystone'
import {PimAttributeDescription} from "./PimAttributeDescription";
import {LoadingDotsIcon} from "../../../Loading";
import {useQuery} from "@apollo/client";
import {ALL_PIM_PRODUCT_ATTRIBUTES_QUERY} from "../../../graphql/keystone";

export function GetPimAttribute() {
    const { data, error, loading } = useQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });
    const getActiveAttributes = (attributes: PimAttribute[]): PimAttribute[] => {
        return attributes.filter((attribute: PimAttribute) => !attribute.ignored)
    }

    return (
        <GridStyles>
            <PimAttributeDescription />
            {error && <h3>{error.message}</h3>}
            {data?.pimAttributes?.length===0 && <LoadingDotsIcon />}
            {!loading && data && getActiveAttributes(data?.pimAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </GridStyles>
    )
}