import Form from './../styles/Form';
import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import {filterOptions } from 'fuzzy-match-utils';
import {ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, GET_MAGENTO_ATTRIBUTE_LIST_QUERY} from '../../graphql/keystoneQuery'
import {useLazyQuery} from "@apollo/client";
import DispatchContext from "../../DispatchContext";
import {matchingModel} from "../../models/MatchingField";
import StateContext from "../../StateContext";

function MapField() {
    const { id } = useParams();
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    const matching = matchingModel(appState)
    const [attributeCodeState, setAttributeCodeState] = useState(null);
    const [getAttributeList, { loading, attributes }] = useLazyQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    async function findMagentoAttribute() {
        const data = await getAttributeList();
        let options = data.data.magentoAttributes.map(attribute => ({label: attribute.name, value: attribute.code}))
        let match = filterOptions(options, attributeCodeState)
        matching.setAttributes({match, initialAttribute: id})

        appDispatch({ type: "flashMessage", value: `${matching.getNumberMatch()} magento attributes have been found`})
        appDispatch({ type: "matchingAttributesLoad", value: matching.getParams()})
    }

    useEffect(() => {
        setAttributeCodeState(id)
    }, [])

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

export default MapField;