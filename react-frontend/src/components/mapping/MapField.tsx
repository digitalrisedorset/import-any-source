import Form from './../styles/Form';
import { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import { filterOptions } from 'fuzzy-match-utils';
import { ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY } from '../../graphql/keystone'
import { useLazyQuery } from "@apollo/client";
import { MagentoAttribute } from "../../types";
import { useActions } from "../../hooks/useActions";

interface MapFieldProps {
    attribute: MagentoAttribute
}

export function MapField(): JSX.Element {
    const { code } = useParams();
    const { resetFlashMessage } = useActions()
    const { setWoocommerceAttributesMatchFound } = useActions()

    const [attributeCodeState, setAttributeCodeState] = useState('');
    const [getAttributeList, { loading, data }] = useLazyQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    async function findMagentoAttribute(code: string) {
        const data = await getAttributeList();
        let options = data.data.magentoAttributes.map((attribute: MagentoAttribute) => ({label: attribute.name, value: attribute.code}))
        let match = filterOptions(options, attributeCodeState)

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