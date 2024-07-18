import { FormEvent} from "react"
import {RemoteMagentoAttributeProvider} from "../../models/RemoteMagentoAttributeProvider";
import {useActions} from "../../hooks/useActions";
import {useNavigate} from "react-router-dom";
import {useCreateMagentoAttributes} from "../../graphql/keystone/useCreateMagentoAttributes";
import {useProductAttributes} from "../../graphql/magento/useProductAttributes";
import {useMagentoAttributes} from "../../graphql/keystone/useMagentoAttributes";
import StepForm from "../styles/StepForm";

export default function ImportMagentoAttribute() {
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const magentoImportProvider = RemoteMagentoAttributeProvider()
    const createListAttribute = useCreateMagentoAttributes()
    const magentoAttributeData = useMagentoAttributes()
    const { data, loading } = useProductAttributes()

    const isMagentoImportComplete = () => {
        if (magentoAttributeData?.data?.magentoAttributes?.length !== undefined) {
            return magentoAttributeData?.data?.magentoAttributes?.length > 0
        }
    }

    if (loading) return <>Loading...</>

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
                navigate(`/magento`);
            }
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <StepForm>
            <h2>Step 2</h2>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block" disabled={isMagentoImportComplete()}>
                Import Magento Attributes
            </button>
        </StepForm>
    )
}