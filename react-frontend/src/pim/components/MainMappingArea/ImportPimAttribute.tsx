import {useActions} from "../../../global/hooks/useActions";
import {RemotePimAttributeProvider} from "../../../mapping/models/RemotePimAttributeProvider"
import {useNavigate} from "react-router-dom";
import {PimSystemSelect} from "./PimSystemSelect"
import {useCreatePimAttributes} from "../../graphql/useCreatePimAttributes";
import {StepForm} from "../../../global/styles/StepForm";
import {useActivePimSystem} from "../../hooks/useCurrentPimSystem";
import {PimAttribute} from "../../../types/keystone";
import {PimSystemReport} from "../PimSystemReport";
import React from "react";

export const ImportPimAttribute: React.FC = () => {
    const currentPimSystem = useActivePimSystem()
    const { addFlashMessage, setPimAttributesImported } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = RemotePimAttributeProvider()
    const createListAttribute = useCreatePimAttributes()

    const isPimImportComplete = (): boolean => {
        return currentPimSystem?.pimAttributes > 0
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            remoteAttributeProvider.loadAttributes(currentPimSystem.name).then(response => {
                createListAttribute({
                    variables: {
                        data: response
                    },
                }).then(() => {
                    addFlashMessage(`${response.length} pim attributes have been added`)
                    const ignoredAttributes = response.filter((item: PimAttribute) => item.ignored)
                    setPimAttributesImported(currentPimSystem.name, response.length, ignoredAttributes.length)
                    navigate(`/pim`);
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
                <PimSystemSelect />
                <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block"
                        disabled={isPimImportComplete() || currentPimSystem.name === ''}>
                    Import {currentPimSystem.name} Attributes
                </button>
            </div>
            <PimSystemReport />
        </StepForm>
    )
}