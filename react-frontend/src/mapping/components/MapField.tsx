import Form from '../../styles/Form';
import { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import { filterOptions } from 'fuzzy-match-utils';
import { MagentoAttribute} from "../../types/keystone";
import { useActions } from "../../global/hooks/useActions";
import {useMagentoAttributesLazy} from "../../magento/graphql/keystone/useMagentoAttributes";

export const MapField = () => {
    const { code } = useParams();
    const { setPimAttributesMatchFound } = useActions()

    const [attributeCodeState, setAttributeCodeState] = useState('');
    const getAttributeList = useMagentoAttributesLazy()

    async function findMagentoAttribute(code: string) {
        const data = await getAttributeList();
        let optionsFromCode = data?.data?.magentoAttributes.map((attribute: MagentoAttribute) => ({label: attribute.code, value: attribute.name}))
        let match = filterOptions(optionsFromCode, attributeCodeState)

        setPimAttributesMatchFound(code, match)
    }

    useEffect(() => {
        if (code) {
            setAttributeCodeState(code)
        }
    }, [])

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
                        Next Pim Attribute Code to Link
                        <input
                            className="mb2"
                            value={attributeCodeState}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                setAttributeCodeState(e.target.value)
                            }
                            type="text"
                            placeholder="Enter a Pim Attribute Code"
                        />
                    </label>

                    <button type="submit">+ Find Magento Attribute</button>
                </fieldset>
            </Form>
        </div>
    )
}