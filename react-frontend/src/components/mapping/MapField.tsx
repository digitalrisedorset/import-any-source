import Form from './../styles/Form';
import { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import { filterOptions } from 'fuzzy-match-utils';
import {LazyQueryResultTuple, OperationVariables, useLazyQuery} from "@apollo/client";
import {KeystoneMagentoAttributeData, MagentoAttribute} from "../../types/keystone";
import { useActions } from "../../hooks/useActions";
import {ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY} from "../../graphql/keystone";

export function MapField(): JSX.Element {
    const { code } = useParams();
    const { resetFlashMessage } = useActions()
    const { setWoocommerceAttributesMatchFound } = useActions()

    const [attributeCodeState, setAttributeCodeState] = useState('');
    const [getAttributeList]: LazyQueryResultTuple<KeystoneMagentoAttributeData, OperationVariables> = useLazyQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    async function findMagentoAttribute(code: string) {
        const data = await getAttributeList();
        let optionsFromCode = data?.data?.magentoAttributes.map((attribute: MagentoAttribute) => ({label: attribute.code, value: attribute.name}))
        let match = filterOptions(optionsFromCode, attributeCodeState)

        setWoocommerceAttributesMatchFound(code, match)
    }

    useEffect(() => {
        if (code) {
            setAttributeCodeState(code)
        }
    }, [])

    resetFlashMessage()

    return (
        <div>
            <Form onSubmit={(e: React.FormEvent): void => {
                e.preventDefault();
                if (code) {
                    findMagentoAttribute(code);
                }
            }}>
                <fieldset>
                    <label htmlFor="code">
                        Next Woocommerce Attribute Code to Link
                        <input
                            className="mb2"
                            value={attributeCodeState}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
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