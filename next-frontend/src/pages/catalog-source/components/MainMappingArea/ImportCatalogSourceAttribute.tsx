import {CatalogSourceAttributeProvider} from "@/pages/mapping/models/CatalogSourceAttributeProvider"
import {useRouter} from "next/router";
import {CatalogSourceSelect} from "./CatalogSourceSelect"
import {useCreateCatalogSourceAttributes} from "../../graphql/useCreateCatalogSourceAttributes";
import {StepForm} from "@/pages/global/styles/StepForm";
import {useActiveCatalogSource} from "../../hooks/useCurrentCatalogSource";
import {KeystoneCatalogSourceAttribute} from "@/pages/types/keystone";
import {CatalogSourceSystemReport} from "../CatalogSourceSystemReport";
import React from "react";
import {useCatalogSourceAttribute} from "@/state/catalogSourceAttributeState";
import {useFlashMessage} from "@/state/flassMessageState";

export const ImportCatalogSourceAttribute: React.FC = () => {
    const {addFlashMessage} = useFlashMessage()
    const {setCatalogSourceAttributesImported} = useCatalogSourceAttribute()
    const currentCatalogSource = useActiveCatalogSource()
    const router = useRouter()
    const remoteAttributeProvider = CatalogSourceAttributeProvider()
    const createListAttribute = useCreateCatalogSourceAttributes()

    const isCatalogSourceImportComplete = (): boolean => {
        return currentCatalogSource?.numberCatalogSourceAttributes > 0
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            remoteAttributeProvider.loadAttributes(currentCatalogSource.name).then(response => {
                createListAttribute({
                    variables: {
                        data: response
                    },
                }).then(() => {
                    addFlashMessage(`${response.length} catalog attributes have been added`)
                    const ignoredAttributes = response.filter((item: KeystoneCatalogSourceAttribute) => item.ignored)
                    setCatalogSourceAttributesImported(currentCatalogSource.name, response.length, ignoredAttributes.length)
                    router.push({pathname: `/catalog-source`});
                }).catch(() => {
                    throw new Error('The attributes could not be created')
                })
            })
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <StepForm>
            <div className="main">
                <h2>Step 1</h2>
                <CatalogSourceSelect />
                <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block"
                        disabled={isCatalogSourceImportComplete() || currentCatalogSource.name === ''}>
                    Import {currentCatalogSource.name} Attributes
                </button>
            </div>
            <CatalogSourceSystemReport currentCatalogSource={currentCatalogSource} />
        </StepForm>
    )
}