import {OperationVariables, QueryResult} from "@apollo/client";
import {
    PimAttribute,
    PimQueryResult
} from "../../../types/keystone";
import {usePimAttributesNotMapped} from "../../../graphql/keystone/useFindPimAttributesNotMapped";
import {useCurrentPimSystem} from "../../../hooks/useCurrentPimSystem";
import {useMappingRemaining} from "../../../hooks/useMappingVerifier";

export const PimAttributeDescription = () => {
    const currentPimSystem = useCurrentPimSystem()
    const mappingRemaining = useMappingRemaining()
    const { data }: QueryResult<PimQueryResult | OperationVariables> = usePimAttributesNotMapped()

    const getCountAttributesToMap = (attributes: PimAttribute[]) => {
        if (mappingRemaining === 0) {
            return '(all the attributes are mapped)'
        } else {
            return `(${mappingRemaining} attributes are still to find mapping)`
        }
    }

    return (
       <h2>{currentPimSystem} Attributes {data && getCountAttributesToMap(data?.pimAttributes)}</h2>
    )
}