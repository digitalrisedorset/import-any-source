import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY} from "../../../graphql/keystone";
import {
    PimAttribute,
    PimQueryResult
} from "../../../types/keystone";

export function PimAttributeDescription() {
    const { data }: QueryResult<PimQueryResult | OperationVariables> = useQuery(ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": false
                },
                "magentoCode": null
            }
        }
    });

    const getCountAttributesToMap = (attributes: PimAttribute[]) => {
        if (attributes.length === 0) {
            return '(all the attributes are mapped)'
        } else {
            return `(${attributes.length} attributes are still to find mapping)`
        }
    }

    return (
        <h2>Pim Attributes {data && getCountAttributesToMap(data?.pimAttributes)}</h2>
    )
}