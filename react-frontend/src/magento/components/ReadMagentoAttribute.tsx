import CardStyles from "../../configuration/styles/CardStyles";
import {Attribute} from "./Attribute";
import {MagentoAttribute} from "../../types/keystone";
import {useActions} from "../../global/hooks/useActions";
import {LoadingDotsIcon } from "../../global/components/Loading"
import {useMagentoAttributes} from "../graphql/keystone/useMagentoAttributes";

export const ReadMagentoAttribute = () => {
    const { addFlashMessage } = useActions()
    const { data, error, loading } = useMagentoAttributes()

    if (!error && !loading && data) {
        addFlashMessage(`The system has loaded ${data?.magentoAttributes?.length} magento attributes`)
    }

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