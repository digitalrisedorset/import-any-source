import {Form, Label} from '../../global/styles/Form';
import React, { useState, useEffect } from "react"
import { filterOptions } from 'fuzzy-match-utils';
import { MagentoAttribute} from "../../types/keystone";
import {useMagentoAttributesLazy} from "../../magento/graphql/keystone/useMagentoAttributes";
import {useRouter} from "next/router";
import {useCatalogSourceMapping} from "@/state/catalogSourceMappingState";

export const MapField: React.FC = () => {
    const MAX_MATCHES = 5;
    const { query } = useRouter();
    const code = query.attribute;
    const { setCatalogSourceAttributesMatchFound } = useCatalogSourceMapping()

    const [attributeCodeState, setAttributeCodeState] = useState<string>('');
    const getAttributeList = useMagentoAttributesLazy()

    async function findMagentoAttribute(code: string) {
        const data = await getAttributeList()
        let optionsFromCode = data?.data?.magentoAttributes.map((attribute: MagentoAttribute) => ({label: attribute.code, value: attribute.name}))
        let match = filterOptions(optionsFromCode, attributeCodeState)
        const bestMatches= match.slice(0, MAX_MATCHES);

        setCatalogSourceAttributesMatchFound(code, bestMatches)
    }

    if (code==='') return <h3>The attribute code in the query is not found</h3>

    useEffect(() => {
        setAttributeCodeState(code)
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
                    <Label htmlFor="code">Next CatalogSource Attribute Code to Link</Label>
                    <input
                        className="mb2"
                        value={attributeCodeState}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                            setAttributeCodeState(e.target.value)
                        }
                        type="text"
                        placeholder="Enter a CatalogSource Attribute Code"
                    />

                    <button type="submit">+ Find Magento Attribute</button>
                </fieldset>
            </Form>
        </div>
    )
}