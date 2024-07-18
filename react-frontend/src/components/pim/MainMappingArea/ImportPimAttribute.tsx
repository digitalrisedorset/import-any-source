import {useActions} from "../../../hooks/useActions";
import {RemotePimAttributeProvider} from "../../../models/RemotePimAttributeProvider"
import {useNavigate} from "react-router-dom";
import {LoadingDotsIcon} from "../../../Loading";
import {useState} from "react";
import {PimSystemSelect} from "./PimSystemSelect"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {PimSystemHandler} from "../../../models/PimSystem";
import {usePimAttributes} from "../../../graphql/keystone/usePimAttributes";
import {useCreatePimAttributes} from "../../../graphql/keystone/useCreatePimAttributes";
import StepForm from "../../styles/StepForm";

export default function ImportPimAttribute() {
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
    const { data, error, loading } = usePimAttributes()
    const pimSystemHandler = new PimSystemHandler()
    const [importing, setImporting] = useState(false)
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = RemotePimAttributeProvider()
    const createListAttribute = useCreatePimAttributes()

    const isPimImportComplete = () => {
        if (data?.pimAttributes?.length !== undefined) {
            return data?.pimAttributes?.length > 0
        }
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            setImporting(true)
            remoteAttributeProvider.loadAttributes(pimSystemCode).then(response => {
                createListAttribute({
                    variables: {
                        data: response
                    },
                });
                addFlashMessage(`${response.length} pim attributes have been added`)
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
            <h2>Step 1</h2>
            <PimSystemSelect />
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block"
                    disabled={isPimImportComplete() || pimSystemCode === ''}>
                Import {pimSystemHandler.getActiveSystemLabel(pimSystemCode)} Attributes
            </button>
        </StepForm>
    )
}