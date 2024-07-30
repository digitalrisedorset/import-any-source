import CardStyles from "../../configuration/styles/CardStyles";
import {useMagentoAttributes} from "../graphql/keystone/useMagentoAttributes";
import {MagentoAttribute} from "../../types/keystone";
import {Attribute} from "./Attribute";

export const GetMagentoMappedAttribute = () => {
    const { data, error, loading } = useMagentoAttributes()

    const getActiveAttributes = (attributes: MagentoAttribute[]): MagentoAttribute[] => {
        return attributes.filter((attribute: MagentoAttribute) => attribute.assignedTo.length>0)
        return attributes
    }

    return (
        <CardStyles>
            <h3>Magento mapped attributes</h3>
            {!loading && getActiveAttributes(data?.magentoAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </CardStyles>
    )
}