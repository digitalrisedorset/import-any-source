import { useContext } from "react"
import StateContext from "../../StateContext";
import Attribute from "./Attribute";
import CartStyles from "../styles/CartStyles";
import {matchingModel} from "../../models/MatchingField";

export default function MatchingField() {
    const appState = useContext(StateContext)
    const matching = matchingModel(appState)

    return (
        <CartStyles>
            <h2>Matching Attributes</h2>
            {(matching && matching.hasAttributes() &&
                matching.getAttributes().map((attribute) => (
                    <Attribute attribute={attribute} initialAttribute={matching.getInitialAttribute()}/>
                ))
            )}
        </CartStyles>
    )
}