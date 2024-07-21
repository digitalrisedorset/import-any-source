import { FormEvent} from "react"
import {RemoteMagentoAttributeProvider} from "../../models/RemoteMagentoAttributeProvider";
import {useActions} from "../../hooks/useActions";
import {useNavigate} from "react-router-dom";
import {useCreateMagentoAttributes} from "../../graphql/keystone/useCreateMagentoAttributes";
import {useProductAttributes} from "../../graphql/magento/useProductAttributes";
import StepForm from "../styles/StepForm";
import {useMagentoAttributes} from "../../hooks/useMagentoAttributes";

export default function ImportMagentoAttribute() {
    const { addFlashMessage, setMagentoAttributesImported } = useActions()
    const navigate = useNavigate()
    const magentoImportProvider = RemoteMagentoAttributeProvider()
    const createListAttribute = useCreateMagentoAttributes()
    const magentoAttributes = useMagentoAttributes()
    const { data } = useProductAttributes()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            if (data?.attributesList?.items) {
                const attributes = magentoImportProvider.setAttributeListToCreate(data?.attributesList?.items)
                createListAttribute({
                    variables: {
                        data: attributes
                    },
                });
                addFlashMessage(`${attributes.length} magento attributes have been added`)
                setMagentoAttributesImported(attributes.length)
                navigate(`/magento`);
            }
        } catch (e) {
            console.log('error');
        }
    }

    const StepMessage = () => {
        let heading = 'Step 2'
        if (magentoAttributes === 0) {
            heading = heading.concat(`: no attributes were imported from Magento`)
        } else {
            heading = heading.concat(`: ${magentoAttributes} were imported from Magento`)
        }

        return heading
    }

    return (
        <StepForm>
            <h2>{StepMessage()}</h2>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block" disabled={magentoAttributes > 0}>
                Import Magento Attributes
            </button>
        </StepForm>
    )
}