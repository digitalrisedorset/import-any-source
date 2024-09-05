import {useEffect, useState} from "react";
import {UpdateModel} from "../../models/UpdateImport"
import {ImportUpdateResponse} from "@/pages/types/catalog-source";
import {MonitoringNotification} from "@/pages/global/styles/StepForm";
import {useFlashMessage} from "@/state/flassMessageState";
import {useCatalogSourceProduct} from "@/state/catalogSourceProductState";
import {
    UpdateNotificationMessage
} from "@/pages/catalog-source/components/Monitoring/UpdateNotificationMessage/UpdateNotificationMessage";

const InitResponse: ImportUpdateResponse = {
    filename: '',
    fileurl: '',
    rows: []
};

interface UpdateResponse extends ImportUpdateResponse {
    numberItem: number
}

const MINUTE_MS = 5000;

export const MonitorUpdate: React.FC = () => {
    const [updateCsvFile, setUpdateCsvFile] = useState<UpdateResponse>(InitResponse as UpdateResponse)
    const { addFlashMessage} = useFlashMessage()
    const { setCatalogSourceProductUpdateNotification } = useCatalogSourceProduct()

    useEffect(() => {
        const updateModel = new UpdateModel()

        const interval = setInterval(async () => {
            updateModel.createUpdateImport().then(response => {
                setUpdateCsvFile(response as UpdateResponse)
                if (response?.rows !== undefined) {
                    setCatalogSourceProductUpdateNotification(response?.rows)
                    addFlashMessage(`${response?.rows?.length} updates have been made`)
                }
            })
        }, MINUTE_MS);

        return () => clearInterval(interval)
    }, [])

    return (
        <MonitoringNotification>
            <div className="main">
                <h3>Product Update Notification Status</h3>
                <UpdateNotificationMessage updateCsvFile={updateCsvFile} />
            </div>
        </MonitoringNotification>
    )
}