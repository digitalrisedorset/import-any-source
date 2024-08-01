import CardStyles from "../../configuration/styles/CardStyles";
import {useMagentoAttributes} from "../graphql/keystone/useMagentoAttributes";
import {MagentoAttribute} from "../../types/keystone";
import {Attribute} from "./Attribute";

export const GetMagentoMappedAttribute = () => {
    const { data, loading } = useMagentoAttributes()

    const getActiveAttributes = (attributes: MagentoAttribute[]): MagentoAttribute[] => {
        return attributes?.filter((attribute: MagentoAttribute) => attribute.assignedTo.length>0)
    }

    if (!loading && getActiveAttributes(data?.magentoAttributes).length === 0) return <CardStyles><h3>No Attribute is mapped yet</h3></CardStyles>

    return (
        <CardStyles>
            <h3>Magento mapped attributes</h3>
            {!loading && getActiveAttributes(data?.magentoAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </CardStyles>
    )
}