import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {
    PimAttribute,
    PimQueryResult
} from "../../../types/keystone";
import {usePimAttributesNotMapped} from "../../../graphql/keystone/useFindPimAttributesNotMapped";

export function PimAttributeDescription() {
    const { data }: QueryResult<PimQueryResult | OperationVariables> = usePimAttributesNotMapped()

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