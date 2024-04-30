import Form from './../styles/Form';
import { useState, useContext } from "react"
import {filterOptions } from 'fuzzy-match-utils';
import {GET_MAGENTO_ATTRIBUTE_LIST_QUERY} from '../../graphql/magentoQuery'
import {useQuery} from "@apollo/client";
import DispatchContext from "../../DispatchContext";
import {matchingModel} from "../../models/MatchingField";
import StateContext from "../../StateContext";

export default function MapField() {
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    const matching = matchingModel(appState)
    const [attributeCodeState, setAttributeCodeState] = useState(null);
    const { data, status, error, loading } = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    async function findMagentoAttribute() {
        let options = data.attributesList.items.map(attribute => ({label: attribute.label, value: attribute.code}))
        let match = filterOptions(options, attributeCodeState)
        matching.setAttributes({match, initialAttribute: attributeCodeState})

        appDispatch({ type: "flashMessage", value: `${matching.getNumberMatch()} magento attributes have been found`})
        appDispatch({ type: "matchingAttributesLoad", value: matching.getParams()})
    }

    return (
        <div>
            <Form onSubmit={(e) => {
                e.preventDefault();
                findMagentoAttribute();
            }}>
                <fieldset>
                    <label htmlFor="code">
                        Next Woocommerce Attribute Code to Link
                        <input
                            className="mb2"
                            value={attributeCodeState}
                            onChange={(e) =>
                                setAttributeCodeState(e.target.value)
                            }
                            type="text"
                            placeholder="Enter a Woocommerce Attribute Code"
                        />
                    </label>

                    <button type="submit">+ Find Magento Attribute</button>
                </fieldset>
            </Form>
        </div>
    )
}