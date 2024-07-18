import Attribute from "./Attribute";
import GridStyles from "../styles/GridStyles";
import { MagentoAttribute} from "../../types/keystone";
import { useActions } from "../../hooks/useActions";
import {LoadingDotsIcon } from "../../Loading"
import {useMagentoAttributes} from "../../graphql/keystone/useMagentoAttributes";

export default function ReadMagentoAttribute() {
    const { addFlashMessage } = useActions()
    const { data, error, loading } = useMagentoAttributes()

    if (!error && !loading && data) {
        addFlashMessage(`The system has loaded ${data?.magentoAttributes?.length} magento attributes`)
    }

    return (
        <GridStyles>
            <h2>Magento Attributes</h2>
            {(loading || data?.magentoAttributes?.length===0) && <LoadingDotsIcon />}
            {(data?.magentoAttributes.map((attribute: MagentoAttribute ) => (
                    <Attribute key={attribute.id} attribute={attribute}/>
                ))
            )}
        </GridStyles>
    )
}