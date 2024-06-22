import { GetWoocommerceAttribute } from "./MainMappingArea/GetWoocommerceAttribute";
import { useActions } from "../../hooks/useActions";
import {useParams} from "react-router-dom";
import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {KeystoneMagentoAttributeData, WoocommerceAttributeData} from "../../types/keystone";
import {
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY,
    GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY
} from "../../graphql/keystone";
import {MappingStatusMagentoAttribute} from "../magento/MappingStatusMagentoAttribute";
import {MappingScreen} from '../styles/MappingScreen';
import {GetIgnoredAttribute} from "./IgnoreFieldArea/GetIgnoredAttribute";

export function Woocommerce(): JSX.Element {
    const { initialAttribute, matchingAttribute } = useParams();
    const { addFlashMessage } = useActions()
    const { data, error, loading }: QueryResult<OperationVariables> = useQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });

    const mappingResult:QueryResult<KeystoneMagentoAttributeData | OperationVariables> = useQuery(GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "required": {
                    "equals": true
                }
            }
        }
    });

    if (initialAttribute && matchingAttribute) {
        addFlashMessage(`The woocommerce attribute "${initialAttribute}" is matched with the magento attribute "${matchingAttribute}"`)
    } else if (!error && !loading && data) {
        addFlashMessage(`The system has loaded ${data.woocommerceAttributes.length} woocommerce attributes`)
    }

    if (loading) return <>Loading...</>

    return (
        <MappingScreen>
            <div className="fields">
                {error && <h3>{error.message}</h3>}
                {loading && <h3>Loading...</h3>}
                <MappingStatusMagentoAttribute data={mappingResult.data as KeystoneMagentoAttributeData}/>
                <GetWoocommerceAttribute data={data as WoocommerceAttributeData} />
            </div>
            <GetIgnoredAttribute />
        </MappingScreen>
    )
}