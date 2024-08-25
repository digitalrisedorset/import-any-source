import {StepForm} from "../../global/styles/StepForm";
import React, {FormEvent} from "react"
import {RemoteMagentoAttributeProvider} from "../models/RemoteMagentoAttributeProvider";
import {useRouter} from "next/router";
import {useCreateMagentoAttributes} from "../graphql/keystone/useCreateMagentoAttributes";
import {useProductAttributes} from "../graphql/magento/useProductAttributes";
import {useMagentoAttributes} from "../hooks/useMagentoAttributes";
import {MagentoReport} from "./MagentoReport";
import {useActions} from "@/pages/global/hooks/useActions";

export const ImportMagentoAttribute: React.FC = () => {
    const { addFlashMessage, setMagentoAttributesImported } = useActions();
    const magentoImportProvider = RemoteMagentoAttributeProvider()
    const createListAttribute = useCreateMagentoAttributes()
    const magentoAttributes = useMagentoAttributes()
    const { data } = useProductAttributes()
    const router = useRouter()

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
                router.push({pathname: `/magento`});
            }
        } catch (e) {
            console.log('error');
        }
    }

    console.log('magento attributes', magentoAttributes)

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