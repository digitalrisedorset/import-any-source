import CardStyles from "../../../configuration/styles/CardStyles";
import {PimAttribute} from '../../../types/keystone'
import {usePimAttributes} from "../../graphql/usePimAttributes";
import {Attribute} from "./Attribute";
import {useCurrentPimSystem} from "../../hooks/useCurrentPimSystem";
import {LoadingDotsIcon} from "../../../global/components/Loading";

export const GetPimMappedAttribute = () => {
    const currentPimSystem = useCurrentPimSystem()
    const { data, loading } = usePimAttributes()
    const candelete = "false"

    const getActiveAttributes = (attributes: PimAttribute[]): PimAttribute[] => {
        return attributes.filter((attribute: PimAttribute) => attribute.magentoCode?.code!==undefined)
    }

    if (loading) return <LoadingDotsIcon />

    if (getActiveAttributes(data?.pimAttributes).length === 0) return <CardStyles><h3>No Attribute is mapped yet</h3></CardStyles>

    return (
        <CardStyles>
            <h3>{currentPimSystem} mapped attributes</h3>
            {!loading && getActiveAttributes(data?.pimAttributes).map(
                (attribute) => <Attribute key={attribute.id} candelete={candelete} attribute={attribute}/>
            )}
        </CardStyles>
    )
}