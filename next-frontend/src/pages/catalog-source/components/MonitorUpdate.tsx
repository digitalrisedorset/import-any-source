import {useEffect, useState} from "react";
import {UpdateModel} from "../models/UpdateImport"
import {ImportUpdateResponse} from "../../types/catalog-source";
import {RenderFileDownload} from "./DownloadLink"
import {useAccess} from "../../configuration/hooks/useAccess";
import {useProductImport} from "../hooks/useProductImport";
import {StepForm} from "@/pages/global/styles/StepForm";
import {MonitoringArea} from "@/pages/global/styles/MappingScreen";
import {useFlashMessage} from "@/state/flassMessageState";
import {useCatalogSourceProduct} from "@/state/catalogSourceProductState";

const InitResponse: ImportUpdateResponse = {
    filename: '',
    fileurl: '',
    rows: []
};

interface UpdateResponse extends ImportUpdateResponse {
    numberItem: number
}

const MINUTE_MS = 5000;

const RenderUpdate: React.FC<UpdateResponse> = (updateCsvFile: UpdateResponse) => {
    return (
        <MonitoringArea>
            {updateCsvFile?.numberItem===0 && <h3>No Update have been happening</h3>}
            {updateCsvFile?.numberItem>0 && <>
                <h3>The last update has saved {updateCsvFile.numberItem} product changes</h3>
                {RenderFileDownload(updateCsvFile)}
            </>}
        </MonitoringArea>
    )
}

const RenderDelete: React.FC<UpdateResponse> = (deleteCsvFile: UpdateResponse) => {
    return (
        <MonitoringArea>
            {deleteCsvFile?.numberItem === 0 && <>
                <h3>No Product have been deleted</h3>
            </>}
            {deleteCsvFile?.numberItem > 0 && <>
                <h3>The last product validation has {deleteCsvFile.numberItem} product deleted</h3>
                {RenderFileDownload(deleteCsvFile)}
            </>}
        </MonitoringArea>
    )
}

export const MonitorUpdate: React.FC = () => {
    const [updateCsvFile, setUpdateCsvFile] = useState<UpdateResponse>(InitResponse as UpdateResponse)
    const [deleteCsvFile, setDeleteCsvFile] = useState<UpdateResponse>(InitResponse as UpdateResponse)
    const {canDeleteProducts, canUpdateProducts, canMonitorData} = useAccess()
    const { addFlashMessage} = useFlashMessage()
    const { setCatalogSourceProductUpdateNotification, setCatalogSourceProductDeleteNotification, setProductMonitoredAction } = useCatalogSourceProduct()
    const {importMonitored} = useProductImport()

    useEffect(() => {
        if (importMonitored) {
            const updateModel = new UpdateModel()

            const interval = setInterval(async () => {
                if (canUpdateProducts) {
                    updateModel.createUpdateImport().then(response => {
                        setUpdateCsvFile(response as UpdateResponse)
                        if (response?.rows !== undefined) {
                            setCatalogSourceProductUpdateNotification(response?.rows)
                            addFlashMessage(`${response?.rows?.length} updates have been made`)
                        }
                    })
                }
            }, MINUTE_MS);

            const interval2 = setInterval(async () => {
                if (canDeleteProducts) {
                    updateModel.createDeleteImport().then(response => {
                        setDeleteCsvFile(response as UpdateResponse)
                        if (response?.rows !== undefined) {
                            setCatalogSourceProductDeleteNotification(response?.rows)
                            if (response?.rows?.length > 0) {
                                addFlashMessage(`${response?.rows?.length} products have been deleted`)
                            }
                        }
                    })
                }
            }, MINUTE_MS);

            return () => clearInterval(interval && interval2)
        }
    }, [importMonitored])

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            setProductMonitoredAction(!importMonitored)
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <StepForm>
            <div className="main">
            <h2>Product Update Status</h2>
            {canMonitorData && !importMonitored && <button type="submit" onClick={handleSubmit}>
                Launch Product Monitoring
            </button>
            }
            {importMonitored && <>The product updates are being monitored<br/>
                <button type="submit" onClick={handleSubmit}>
                    Stop Product Monitoring
                </button>
                {canUpdateProducts && RenderUpdate(updateCsvFile)}
                {canDeleteProducts && RenderDelete(deleteCsvFile)}
            </>}
            </div>
        </StepForm>
    )
}