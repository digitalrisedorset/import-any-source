import { useContext } from "react"
import { StateContext } from "../../StateContext";
//import {magentoModel} from "../../models/MagentoData";
import Attribute from "./Attribute";
import CartStyles from "../styles/CartStyles";

interface MagentoAttributesData {
    data: {
        magentoAttributes: []
    }
}

export default function ReadMagentoAttribute() {
    const appState = useContext(StateContext)
    let magentoData = {}
    // if (data.magentoAttributes.length>0) {
    //     magentoData = {magento: {attributes: data.magentoAttributes}}
    // } else {
    //     //magentoData = appState
    // }
    const magento = {}//magentoModel(magentoData)

    return (
        <CartStyles>
            <h2>Magento Attributes</h2>
            {/*{(magento && magento.hasAttributes() &&*/}
            {/*    magento.getAttributes().map((attribute) => (*/}
            {/*        <Attribute key={attribute.code} attribute={attribute}/>*/}
            {/*    ))*/}
            {/*)}*/}
        </CartStyles>
    )
}