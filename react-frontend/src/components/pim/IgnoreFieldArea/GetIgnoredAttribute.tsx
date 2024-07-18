import {MappingIgnoredArea} from "../../styles/MappingScreen";
import {PimAttribute} from "../../../types/keystone";
import {IgnoredAttribute} from "./IgnoredAttribute";
import {usePimAttributes} from "../../../graphql/keystone/usePimAttributes";

export function GetIgnoredAttribute() {
    const { data, error, loading } = usePimAttributes()

    const getIgnoredAttributesAlphabeticallyOrdered = (attributes: PimAttribute[]): PimAttribute[] => {
        const list = attributes.filter((attribute: PimAttribute) => attribute.ignored)
        list.sort((a, b) => a.code.localeCompare(b.code))

        return list
    }

    return (
        <MappingIgnoredArea>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            <h4>Ignored Attributes</h4>
            {data && getIgnoredAttributesAlphabeticallyOrdered(data?.pimAttributes).map(
                (attribute: PimAttribute) => <IgnoredAttribute key={attribute.id} attribute={attribute}/>
            )}
        </MappingIgnoredArea>
    )
}