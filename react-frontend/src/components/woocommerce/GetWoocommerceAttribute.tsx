import { useContext } from "react"
import { StateContext } from "../../StateContext"
//import { woocommerceModel } from "../../models/WoocommerceData"
import { Attribute } from "./Attribute";
import CartStyles from "../styles/CartStyles";
import { WoocommerceAttribute, WoocommerceAttributeData } from '../../types'
import {useQuery} from "@apollo/client";
import {ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY} from "../../graphql/keystone";

interface AttributeListProps {
    attributeCode: string
}

export function GetWoocommerceAttribute(): JSX.Element {
    const { data, error, loading } = useQuery<WoocommerceAttributeData>(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });

    const appState = useContext(StateContext)
    let woocommerceData = {}
    // if (data.woocommerceAttributes.length>0) {
    //     woocommerceData = {woocommerce: {attributes: data.woocommerceAttributes}}
    // } else {
    //     woocommerceData = appState
    // }
    //const woocommerce = woocommerceModel(woocommerceData)

    return (
        <CartStyles>
            <h2>Woocommerce Attributes</h2>
            {(data && data!.woocommerceAttributes.map((attribute: WoocommerceAttribute, index: number) => (
                    <Attribute key={index} attribute={attribute}/>
                ))
            )}
        </CartStyles>
    )
}