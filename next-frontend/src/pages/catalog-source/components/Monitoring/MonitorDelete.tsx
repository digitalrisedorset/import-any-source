import {useEffect, useState} from "react";
import {ImportUpdateResponse} from "@/pages/types/catalog-source";
import {useFlashMessage} from "@/state/flassMessageState";
import {useCatalogSourceProduct} from "@/state/catalogSourceProductState";
import {UpdateModel} from "@/pages/catalog-source/models/UpdateImport";
import {MonitoringNotification} from "@/pages/global/styles/StepForm";
import {
    DeleteNotificationMessage
} from "@/pages/catalog-source/components/Monitoring/UpdateNotificationMessage/DeleteNotificationMessage";

const InitResponse: ImportUpdateResponse = {
    filename: '',
    fileurl: '',
    rows: []
};

export interface UpdateResponse extends ImportUpdateResponse {
    numberItem: number
}

const MINUTE_MS = 5000;

export const MonitorDelete: React.FC = () => {
    const [deleteCsvFile, setDeleteCsvFile] = useState<UpdateResponse>(InitResponse as UpdateResponse)
    const { addFlashMessage} = useFlashMessage()
    const { setCatalogSourceProductDeleteNotification } = useCatalogSourceProduct()

    useEffect(() => {
        const updateModel = new UpdateModel()

        const interval = setInterval(async () => {
            updateModel.createDeleteImport().then(response => {
                setDeleteCsvFile(response as UpdateResponse)
                if (response?.rows !== undefined) {
                    setCatalogSourceProductDeleteNotification(response?.rows)
                    if (response?.rows?.length > 0) {
                        addFlashMessage(`${response?.rows?.length} products have been deleted`)
                    }
                }
            })
        }, MINUTE_MS);

        return () => clearInterval(interval)
    }, [])

    return (
        <MonitoringNotification>
            <div className="main">
                <h3>Product Delete Notification Status</h3>
                <DeleteNotificationMessage deleteCsvFile={deleteCsvFile} />
            </div>
        </MonitoringNotification>
    )
}