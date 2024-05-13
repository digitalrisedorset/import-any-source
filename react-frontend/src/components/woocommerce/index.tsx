import { GetWoocommerceAttribute } from "./GetWoocommerceAttribute";
import { useActions } from "../../hooks/useActions";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {WoocommerceAttributeData} from "../../types";
import {ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY} from "../../graphql/keystone";

export function Woocommerce() {
    const { initialAttribute, matchingAttribute } = useParams();
    const { resetFlashMessage, addFlashMessage } = useActions()
    const { data, error, loading } = useQuery<WoocommerceAttributeData>(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });

    if (initialAttribute && matchingAttribute) {
        addFlashMessage(`The woocommerce attribute "${initialAttribute}" is matched with the magento attribute "${matchingAttribute}"`)
    } else if (!error && !loading && data) {
        addFlashMessage(`The system has loaded ${data.woocommerceAttributes.length} woocommerce attributes`)
    }

    return (
        <>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            {/*{status === "error" && <p>Error fetching data</p>}*/}
            {/*{status === "loading" && <p>Fetching data...</p>}*/}
            <GetWoocommerceAttribute data={data} />
            {/*<RemoveWoocommerceAttribute />*/}
            {/*<ImportProduct />*/}
            {/*<ImportWoocommerceAttribute />*/}
            {/*<CreateWoocommerceAttribute />*/}

        </>
    )
}