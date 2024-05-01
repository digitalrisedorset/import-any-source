import { useContext } from "react"
import StateContext from "../../StateContext"
import {woocommerceModel} from "../../models/WoocommerceData"
import Attribute from "./Attribute";
import CartStyles from "../styles/CartStyles";

export default function GetWoocommerceAttribute({data}) {
    const appState = useContext(StateContext)
    let woocommerceData = {}
    if (data.woocommerceAttributes.length>0) {
        woocommerceData = {woocommerce: {attributes: data.woocommerceAttributes}}
    } else {
        woocommerceData = appState
    }
    const woocommerce = woocommerceModel(woocommerceData)

    return (
        <CartStyles>
            <h2>Woocommerce Attributes</h2>
            {(woocommerce && woocommerce.hasAttributes() &&
                woocommerce.getAttributes().map((attribute, index) => (
                    <Attribute key={index} attribute={attribute}/>
                ))
            )}
        </CartStyles>
    )
}