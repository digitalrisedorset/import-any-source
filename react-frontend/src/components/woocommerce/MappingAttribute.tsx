import {WoocommerceAttribute, WoocommerceQueryResult} from "../../types/keystone";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {ALL_WOOCOMMERCE_ATTRIBUTES_NOT_MAPPED_QUERY} from "../../graphql/keystone";
import {useEffect, useState} from "react";

const Form = styled.form`
  button {
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export function MappingAttributes() {
    const [mappingReady, setMappingReady] = useState(false)
    const mappingData: QueryResult<WoocommerceQueryResult | OperationVariables> = useQuery(ALL_WOOCOMMERCE_ATTRIBUTES_NOT_MAPPED_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": false
                },
                "magentoCode": null
            }
        }
    });

    useEffect(() => {
        const isMappingNotComplete = (attributes: WoocommerceAttribute[]) => {
            if (attributes === undefined) {
                setMappingReady(true)
                return
            }

            if (attributes.length !== undefined) {
                setMappingReady(attributes.length > 0)
            }
        }
        isMappingNotComplete(mappingData?.data?.woocommerceAttributes)

        return () => {}
    }, [mappingData?.data?.woocommerceAttributes])

    const navigate = useNavigate()


    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        navigate(`/woocommerce`);
    }

    return (
        <Form>
            <h2>Step 3</h2>

            <button type="submit" disabled={!mappingReady} onClick={handleSubmit}>
                Mapping Attributes
            </button>
        </Form>
    )
}