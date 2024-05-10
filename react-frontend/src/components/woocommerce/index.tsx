//import ImportWoocommerceAttribute from "./ImportWoocommerceAttribute";
//import CreateWoocommerceAttribute from "./CreateWoocommerceAttribute";
import {useQuery} from "@apollo/client";
import { useEffect, useContext } from "react"
import {ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY} from "../../graphql/keystone";
import { GetWoocommerceAttribute } from "./GetWoocommerceAttribute";
//import RemoveWoocommerceAttribute from "./RemoveWoocommerceAttribute";
//import {woocommerceModel} from "../../models/WoocommerceData"
//import StateContext from "../../StateContext";
//import ImportProduct from "./ImportProduct";
import { WoocommerceAttribute, WoocommerceAttributeData } from '../../types'

export function Woocommerce() {
    //const appState = useContext(StateContext)
    //const woocommerce = woocommerceModel(appState)

    //
    // useEffect(() => {
    //     async function loadWoocommerceData() {
    //         try {
    //             if (data) {
    //                 woocommerce.setAttributes(data)
    //             }
    //         } catch (e) {
    //             console.log("There was a problem.")
    //         }
    //     }
    //     loadWoocommerceData()
    // }, [])

    //if (loading) return <p>Loading...</p>;
    //if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {/*{status === "error" && <p>Error fetching data</p>}*/}
            {/*{status === "loading" && <p>Fetching data...</p>}*/}
            <GetWoocommerceAttribute />
            {/*<div>
                <h1>Attribute List</h1>
                <ul>
                    {loading ? 'Loading...' : data!.woocommerceAttributes.map((attribute) => (
                        <li key={attribute.id}>name: {attribute.name}, type: {attribute.type}</li>
                    ))}
                </ul>
            </div>*/}
            {/*<RemoveWoocommerceAttribute />*/}
            {/*<ImportProduct />*/}
            {/*<ImportWoocommerceAttribute />*/}
            {/*<CreateWoocommerceAttribute />*/}

        </>
    )
}