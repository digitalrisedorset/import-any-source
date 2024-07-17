import {OperationVariables, QueryResult, useMutation, useQuery} from '@apollo/client';
import {
    ALL_PIM_PRODUCT_ATTRIBUTES_QUERY,
    CREATE_PIM_ATTRIBUTE_LIST_MUTATION
} from '../../../graphql/keystone'
import {useActions} from "../../../hooks/useActions";
import {RemotePimAttributeProvider} from "../../../models/RemotePimAttributeProvider"
import {useNavigate} from "react-router-dom";
import {PimAttributeData} from "../../../types/keystone";
import {LoadingDotsIcon} from "../../../Loading";
import {useState} from "react";
import {PimSystemSelect} from "./PimSystemSelect"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {PimSystemHandler} from "../../../models/PimSystem";

export default function ImportPimAttribute() {
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
    const pimSystemHandler = new PimSystemHandler()
    const [importing, setImporting] = useState(false)
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = RemotePimAttributeProvider()
    const [createListAttribute] = useMutation(CREATE_PIM_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_PIM_PRODUCT_ATTRIBUTES_QUERY }],
    });
    const pimAttributeData: QueryResult<PimAttributeData | OperationVariables> = useQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });

    const isPimImportComplete = () => {
        if (pimAttributeData?.data?.pimAttributes?.length !== undefined) {
            return pimAttributeData?.data?.pimAttributes?.length > 0
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
        <form>
            <h2>Step 1</h2>
            <PimSystemSelect />
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block"
                    disabled={isPimImportComplete() || pimSystemCode === ''}>
                Import {pimSystemHandler.getActiveSystemLabel(pimSystemCode)} Attributes
            </button>
        </form>
    )
}