import ImportWoocommerceAttribute from "./ImportWoocommerceAttribute";
import CreateWoocommerceAttribute from "./CreateWoocommerceAttribute";
import {useQuery} from "@apollo/client";
import { useEffect, useContext } from "react"
import {ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY} from "../../graphql/keystoneQuery";
import GetWoocommerceAttribute from "./GetWoocommerceAttribute";
import RemoveWoocommerceAttribute from "./RemoveWoocommerceAttribute";
import {woocommerceModel} from "../../models/WoocommerceData"
import StateContext from "../../StateContext";

export default function Woocommerce() {
    const appState = useContext(StateContext)
    const woocommerce = woocommerceModel(appState)
    const { data, status, error, loading } = useQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });

    useEffect(() => {
        async function loadWoocommerceData() {
            try {
                if (data) {
                    woocommerce.setAttributes(data)
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        loadWoocommerceData()
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {status === "error" && <p>Error fetching data</p>}
            {status === "loading" && <p>Fetching data...</p>}
            <GetWoocommerceAttribute data={data} />
            <RemoveWoocommerceAttribute />
            <ImportWoocommerceAttribute />
            <CreateWoocommerceAttribute />
        </>
    )
}