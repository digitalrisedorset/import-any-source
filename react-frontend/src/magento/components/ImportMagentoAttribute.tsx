import {StepForm} from "../../global/styles/StepForm";
import React, {FormEvent} from "react"
import {RemoteMagentoAttributeProvider} from "../models/RemoteMagentoAttributeProvider";
import {useActions} from "../../global/hooks/useActions";
import {useNavigate} from "react-router-dom";
import {useCreateMagentoAttributes} from "../graphql/keystone/useCreateMagentoAttributes";
import {useProductAttributes} from "../graphql/magento/useProductAttributes";
import {useMagentoAttributes} from "../hooks/useMagentoAttributes";
import {MagentoReport} from "./MagentoReport";

export const ImportMagentoAttribute: React.FC = () => {
    const { addFlashMessage, setMagentoAttributesImported } = useActions()
    const magentoImportProvider = RemoteMagentoAttributeProvider()
    const createListAttribute = useCreateMagentoAttributes()
    const magentoAttributes = useMagentoAttributes()
    const { data } = useProductAttributes()
    const navigate = useNavigate()

    const magentoAttributeImported = (): boolean => {
        return magentoAttributes > 0
    }

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

    return (
        <StepForm>
            <div className="main">
                <h2>Step 2</h2>
                <button type="submit" onClick={handleSubmit} disabled={magentoAttributeImported()}>
                    Import Magento Attributes
                </button>
            </div>
            <MagentoReport/>
        </StepForm>
    )
}