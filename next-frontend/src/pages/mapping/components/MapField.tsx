import {Form} from '../../global/styles/Form';
import React, { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import { filterOptions } from 'fuzzy-match-utils';
import { MagentoAttribute} from "../../types/keystone";
import {useMagentoAttributesLazy} from "../../magento/graphql/keystone/useMagentoAttributes";
import {useAppSelector} from "@/state/store";

export const MapField: React.FC = () => {
    const { code } = useParams();
    const { setCatalogSourceAttributesMatchFound } = useAppSelector((state) => state.catalogSourceMapping)

    const [attributeCodeState, setAttributeCodeState] = useState<string>('');
    const getAttributeList = useMagentoAttributesLazy()

    async function findMagentoAttribute(code: string) {
        const data = await getAttributeList();
        let optionsFromCode = data?.data?.magentoAttributes.map((attribute: MagentoAttribute) => ({label: attribute.code, value: attribute.name}))
        let match = filterOptions(optionsFromCode, attributeCodeState)

        setCatalogSourceAttributesMatchFound(code, match)
    }

    useEffect(() => {
        if (code) {
            setAttributeCodeState(code)
        }
    }, [code])

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
                        Next CatalogSource Attribute Code to Link
                        <input
                            className="mb2"
                            value={attributeCodeState}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                setAttributeCodeState(e.target.value)
                            }
                            type="text"
                            placeholder="Enter a CatalogSource Attribute Code"
                        />
                    </label>

                    <button type="submit">+ Find Magento Attribute</button>
                </fieldset>
            </Form>
        </div>
    )
}