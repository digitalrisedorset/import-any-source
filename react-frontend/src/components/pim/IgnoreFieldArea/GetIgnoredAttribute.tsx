import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {ALL_PIM_PRODUCT_ATTRIBUTES_QUERY } from "../../../graphql/keystone";
import {MappingIgnoredArea} from "../../styles/MappingScreen";
import {PimAttribute, PimAttributeData} from "../../../types/keystone";
import {IgnoredAttribute} from "./IgnoredAttribute";

export function GetIgnoredAttribute() {
    const { data, error, loading }: QueryResult<PimAttributeData | OperationVariables > = useQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    if (loading) return <>Loading...</>

    const getIgnoredAttributesAlphabeticallyOrdered = (attributes: PimAttribute[]): PimAttribute[] => {
        const list = attributes.filter((attribute: PimAttribute) => attribute.ignored)
        list.sort((a, b) => a.code.localeCompare(b.code))

        return list
    }

    return (
        <MappingIgnoredArea>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            <h4>Ignored Attributes</h4>
            {data && getIgnoredAttributesAlphabeticallyOrdered(data?.pimAttributes).map(
                (attribute: PimAttribute) => <IgnoredAttribute key={attribute.id} attribute={attribute}/>
            )}
        </MappingIgnoredArea>
    )
}