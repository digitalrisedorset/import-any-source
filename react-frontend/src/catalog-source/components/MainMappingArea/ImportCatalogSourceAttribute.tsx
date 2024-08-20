import {useActions} from "../../../global/hooks/useActions";
import {CatalogSourceAttributeProvider} from "../../../mapping/models/CatalogSourceAttributeProvider"
import {useNavigate} from "react-router-dom";
import {CatalogSourceSelect} from "./CatalogSourceSelect"
import {useCreateCatalogSourceAttributes} from "../../graphql/useCreateCatalogSourceAttributes";
import {StepForm} from "../../../global/styles/StepForm";
import {useActiveCatalogSource} from "../../hooks/useCurrentCatalogSource";
import {KeystoneCatalogSourceAttribute} from "../../../types/keystone";
import {CatalogSourceSystemReport} from "../CatalogSourceSystemReport";
import React from "react";

export const ImportCatalogSourceAttribute: React.FC = () => {
    const currentCatalogSource = useActiveCatalogSource()
    const { addFlashMessage, setCatalogSourceAttributesImported } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = CatalogSourceAttributeProvider()
    const createListAttribute = useCreateCatalogSourceAttributes()

    const isCatalogSourceImportComplete = (): boolean => {
        return currentCatalogSource?.catalogSourceAttributes > 0
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
                    navigate(`/catalog-source`);
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
            <CatalogSourceSystemReport />
        </StepForm>
    )
}