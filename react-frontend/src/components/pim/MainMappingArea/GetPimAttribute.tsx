import { Attribute } from "./Attribute";
import CardStyles from "../../styles/CardStyles";
import {PimAttribute} from '../../../types/keystone'
import {PimAttributeDescription} from "./PimAttributeDescription";
import {LoadingDotsIcon} from "../../../Loading";
import {usePimAttributes} from "../../../graphql/keystone/usePimAttributes";

export function GetPimAttribute() {
    const { data, error, loading } = usePimAttributes()

    const getActiveAttributes = (attributes: PimAttribute[]): PimAttribute[] => {
        return attributes.filter((attribute: PimAttribute) => !attribute.ignored)
    }

    return (
        <CardStyles>
            <PimAttributeDescription />
            {error && <h3>{error.message}</h3>}
            {loading && <LoadingDotsIcon />}
            {!loading && getActiveAttributes(data?.pimAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </CardStyles>
    )
}