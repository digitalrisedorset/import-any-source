import {useActions} from "../../../hooks/useActions";
import {RemotePimAttributeProvider} from "../../../models/RemotePimAttributeProvider"
import {useNavigate} from "react-router-dom";
import {LoadingDotsIcon} from "../../../Loading";
import {useState} from "react";
import {PimSystemSelect} from "./PimSystemSelect"
import {usePimAttributes} from "../../../graphql/keystone/usePimAttributes";
import {useCreatePimAttributes} from "../../../graphql/keystone/useCreatePimAttributes";
import StepForm from "../../styles/StepForm";
import {useActivePimSystem} from "../../../hooks/useCurrentPimSystem";

export default function ImportPimAttribute() {
    const currentPimSystem = useActivePimSystem()
    const { data, error, loading } = usePimAttributes()
    const [importing, setImporting] = useState(false)
    const { addFlashMessage, setPimAttributesImported } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = RemotePimAttributeProvider()
    const createListAttribute = useCreatePimAttributes()

    const isPimImportComplete = () => {
        return currentPimSystem?.pimAttributes > 0
    }

    const StepMessage = () => {
        let heading = 'Step 1'
        if (currentPimSystem.name !== '' && currentPimSystem?.pimAttributes === 0) {
            heading = heading.concat(`: no attributes were imported for the system ${currentPimSystem?.name}`)
        } else {
            heading = heading.concat(`: ${currentPimSystem?.pimAttributes} were imported for the system ${currentPimSystem?.name}`)
        }

        return heading
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
                });
                addFlashMessage(`${response.length} pim attributes have been added`)
                setPimAttributesImported(currentPimSystem.name, response.length)
                setImporting(false)
                navigate(`/pim`);
            })
        } catch (e) {
            console.log('error');
            setImporting(false)
        }
    }

    if (importing) return <LoadingDotsIcon />

    return (
        <StepForm>
            <h2>{StepMessage()}</h2>
            <PimSystemSelect />
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block"
                    disabled={isPimImportComplete() || currentPimSystem.name === ''}>
                Import {currentPimSystem.name} Attributes
            </button>
        </StepForm>
    )
}