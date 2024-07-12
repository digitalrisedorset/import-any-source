import {MonitoringArea} from '../styles/MappingScreen';
import {useEffect, useState} from "react";
import {UpdateModel} from "../../models/UpdateImport"
import {ImportUpdateResponse} from "../../types/woocommerce";
import {RenderFileDownload} from "./DownloadLink"

const InitResponse: ImportUpdateResponse = {
    filename: '',
    fileurl: ''
};

interface UpdateResponse extends ImportUpdateResponse {
    numberItem: number
}

const MINUTE_MS = 15000;

const RenderUpdate = (updateCsvFile: UpdateResponse) => {
    return (
        <>
            {updateCsvFile?.numberItem===0 && <h3>No Update have been happening</h3>}
            {updateCsvFile?.numberItem>0 && <>
                <h3>The last update has saved {updateCsvFile.numberItem} product changes</h3>
                {RenderFileDownload(updateCsvFile)}
            </>}
        </>
    )
}

const RenderDelete = (deleteCsvFile: UpdateResponse) => (
    <>
        {deleteCsvFile?.numberItem===0 && <>
            <h3>No Product have been deleted</h3>
        </>}
        {deleteCsvFile?.numberItem>0 && <>
            <h3>The last product validation has {deleteCsvFile.numberItem} product deleted</h3>
            {RenderFileDownload(deleteCsvFile)}
        </>}
    </>
)

export function MonitorUpdate() {
    const [monitor, setMonitor] = useState(false)
    const [updateCsvFile, setUpdateCsvFile] = useState(InitResponse as UpdateResponse)
    const [deleteCsvFile, setDeleteCsvFile] = useState(InitResponse as UpdateResponse)
    const updateModel = new UpdateModel()

    useEffect(() => {
        const interval = setInterval(async () => {
            updateModel.createUpdateImport().then(response => {
                setUpdateCsvFile(response as UpdateResponse)
            })
        }, MINUTE_MS);

        const interval2 = setInterval(async () => {
            updateModel.createDeleteImport().then(response => {
                setDeleteCsvFile(response as UpdateResponse)
            })
        }, MINUTE_MS);

        return () => {}
    }, [monitor])

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            setMonitor(!monitor)
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <MonitoringArea>
            <form>
                <h2>Product Update Status</h2>
                {!monitor && <button type="submit" onClick={handleSubmit}>
                    Launch Product Monitoring
                </button>
                }
                {monitor && <>The product update are being monitored<br/>
                    <button type="submit" onClick={handleSubmit}>
                        Stop Product Monitoring
                    </button>
                    {RenderUpdate(updateCsvFile)}
                    {RenderDelete(deleteCsvFile)}
                </>}
            </form>
        </MonitoringArea>
    )
}