import {MonitoringArea} from "@/pages/global/styles/MappingScreen";
import {NotificationMessage} from "@/pages/global/styles/StepForm";
import {RenderFileDownload} from "@/pages/catalog-source/components/ImportProduct/ProductImportList/DownloadLink";
import {UpdateResponse} from "@/pages/catalog-source/components/Monitoring/MonitorDelete";

type DeleteNotificationMessageProps = {
    deleteCsvFile: UpdateResponse
}

export const DeleteNotificationMessage: React.FC = ({deleteCsvFile}: DeleteNotificationMessageProps) => {
    return (
        <MonitoringArea>
            {deleteCsvFile?.numberItem === 0 && <>
                <NotificationMessage>No Product have been deleted</NotificationMessage>
            </>}
            {deleteCsvFile?.numberItem > 0 && <>
                <NotificationMessage>The last product validation has {deleteCsvFile.numberItem} product deleted</NotificationMessage>
                {RenderFileDownload(deleteCsvFile)}
            </>}
        </MonitoringArea>
    )
}
