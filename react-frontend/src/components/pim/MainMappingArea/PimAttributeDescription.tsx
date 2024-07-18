import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {
    PimAttribute,
    PimQueryResult
} from "../../../types/keystone";
import {usePimAttributesNotMapped} from "../../../graphql/keystone/useFindPimAttributesNotMapped";
import {useCurrentPimSystem} from "../../../hooks/useCurrentPimSystem";

export function PimAttributeDescription() {
    const currentPimSystem = useCurrentPimSystem()
    const { data }: QueryResult<PimQueryResult | OperationVariables> = usePimAttributesNotMapped()

    const getCountAttributesToMap = (attributes: PimAttribute[]) => {
        if (attributes.length === 0) {
            return '(all the attributes are mapped)'
        } else {
            return `(${attributes.length} attributes are still to find mapping)`
        }
    }

    return (
        <h2>{currentPimSystem} Attributes {data && getCountAttributesToMap(data?.pimAttributes)}</h2>
    )
}