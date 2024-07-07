import {WoocommerceAttributeData} from "../../types/keystone";
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
    const isMappingNotComplete = () => {
        if (props.data?.woocommerceAttributes === undefined) {
            return true
        }

        if (props.data?.woocommerceAttributes?.length !== undefined) {
            return props.data?.woocommerceAttributes?.length > 0
        }
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        navigate(`/woocommerce`);
    }

    return (
        <Form>
            <h2>Step 3</h2>

            <button type="submit" disabled={!isMappingNotComplete()} onClick={handleSubmit}>
                Mapping Attributes
            </button>
        </Form>
    )
}