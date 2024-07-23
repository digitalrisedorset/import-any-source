import {useActions} from "../../../hooks/useActions";
import {RemotePimAttributeProvider} from "../../../models/RemotePimAttributeProvider"
import {useNavigate} from "react-router-dom";
import {LoadingDotsIcon} from "../../../Loading";
import {useState} from "react";
import {PimSystemSelect} from "./PimSystemSelect"
import {useCreatePimAttributes} from "../../../graphql/keystone/useCreatePimAttributes";
import StepForm from "../../styles/StepForm";
import {useActivePimSystem} from "../../../hooks/useCurrentPimSystem";
import {PimAttribute} from "../../../types/keystone";
import {PimSystemReport} from "../PimSystemReport";

export const ImportPimAttribute = () => {
    const currentPimSystem = useActivePimSystem()
    const [importing, setImporting] = useState(false)
    const { addFlashMessage, setPimAttributesImported } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = RemotePimAttributeProvider()
    const createListAttribute = useCreatePimAttributes()

    const isPimImportComplete = () => {
        return currentPimSystem?.pimAttributes > 0
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            setImporting(true)
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
                setImporting(false)
            })
        } catch (e) {
            console.log('error');
            setImporting(false)
        }
    }

    if (importing) return <LoadingDotsIcon />

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