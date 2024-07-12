import {WoocommerceAttribute, WoocommerceAttributeData} from "../../types/keystone";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Form = styled.form`
  button {
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

interface MappingAttributeProps {
    data: WoocommerceAttributeData | undefined
}

export function MappingAttributes(props: MappingAttributeProps) {
    const navigate = useNavigate()
    const isMappingNotComplete = (attributes: WoocommerceAttribute[] | undefined) => {
        if (attributes === undefined) {
            return true
        }

        if (attributes.length !== undefined) {
            return attributes.length > 0
        }
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        navigate(`/woocommerce`);
    }

    return (
        <Form>
            <h2>Step 3</h2>

            <button type="submit" disabled={!isMappingNotComplete(props.data?.woocommerceAttributes)} onClick={handleSubmit}>
                Mapping Attributes
            </button>
        </Form>
    )
}