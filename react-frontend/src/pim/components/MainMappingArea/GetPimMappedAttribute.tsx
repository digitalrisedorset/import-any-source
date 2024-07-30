import CardStyles from "../../../configuration/styles/CardStyles";
import {PimAttribute} from '../../../types/keystone'
import {usePimAttributes} from "../../graphql/usePimAttributes";
import {Attribute} from "./Attribute";
import {useCurrentPimSystem} from "../../hooks/useCurrentPimSystem";

export const GetPimMappedAttribute = () => {
    const currentPimSystem = useCurrentPimSystem()
    const { data, error, loading } = usePimAttributes()
    const candelete: boolean = false

    const getActiveAttributes = (attributes: PimAttribute[]): PimAttribute[] => {
        return attributes.filter((attribute: PimAttribute) => !attribute.ignored)
    }

    return (
        <CardStyles>
            <h3>{currentPimSystem}  mapped attributes</h3>
            {!loading && getActiveAttributes(data?.pimAttributes).map(
                (attribute) => <Attribute key={attribute.id} candelete={candelete} attribute={attribute}/>
            )}
        </CardStyles>
    )
}