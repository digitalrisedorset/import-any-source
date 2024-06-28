import {MonitoringArea} from '../styles/MappingScreen';
import {useEffect, useState} from "react";
import {UpdateModel} from "../../models/UpdateImport"
import {ImportUpdateResponse} from "../../types/woocommerce";
import {RenderFileDownload} from "./DownloadLink"

const InitUpdateResponse: ImportUpdateResponse = {
    filename: '',
    fileurl: ''
}

interface UpdateResponse extends ImportUpdateResponse {
    numberUpdate: number
}

const MINUTE_MS = 30000;

const RenderUpdate = (updateCsvFile: UpdateResponse) => (
    <>
        {updateCsvFile.numberUpdate===0 && <>
            <h3>No Update have been happening</h3>
        </>}
        {updateCsvFile.numberUpdate>0 && <>
            <h3>The last update has saved {updateCsvFile.numberUpdate} product changes</h3>
                {RenderFileDownload(updateCsvFile)}
            </>}
    </>
)

export function MonitorUpdate() {
    const [monitor, setMonitor] = useState(false)
    const [updateCsvFile, setUpdateCsvFile] = useState(InitUpdateResponse)

    useEffect(() => {
        const updateModel = new UpdateModel()
        const interval = setInterval(async () => {
            updateModel.createUpdateImport().then(response => {
                setUpdateCsvFile(response as UpdateResponse)
            })
        }, MINUTE_MS);

        return () => clearInterval(interval);
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
                </>}
                {updateCsvFile?.numberUpdate && RenderUpdate(updateCsvFile as UpdateResponse)}
            </form>
        </MonitoringArea>
    )
}