import {CardStyles} from "../../configuration/styles/CardStyles";
import {Attribute} from "./Attribute";
import {MagentoAttribute} from "../../types/keystone";
import {LoadingDotsIcon } from "../../global/components/Loading"
import {useMagentoAttributes} from "../graphql/keystone/useMagentoAttributes";

export const ReadMagentoAttribute = () => {
    const { data, error, loading } = useMagentoAttributes()

    return (
        <CardStyles>
            <h2>Magento Attributes</h2>
            {(loading || data?.magentoAttributes?.length===0) && <LoadingDotsIcon />}
            {(data?.magentoAttributes.map((attribute: MagentoAttribute ) => (
                    <Attribute key={attribute.id} attribute={attribute}/>
                ))
            )}
        </CardStyles>
    )
}