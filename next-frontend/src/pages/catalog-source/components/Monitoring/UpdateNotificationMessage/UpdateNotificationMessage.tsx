import {MonitoringArea} from "@/pages/global/styles/MappingScreen";
import {NotificationMessage} from "@/pages/global/styles/StepForm";
import {RenderFileDownload} from "@/pages/catalog-source/components/ImportProduct/ProductImportList/DownloadLink";
import {UpdateResponse} from "@/pages/catalog-source/components/Monitoring/MonitorDelete";

type UpdateNotificationMessageProps = {
    updateCsvFile: UpdateResponse
}

export const UpdateNotificationMessage: React.FC = ({updateCsvFile}: UpdateNotificationMessageProps) => {
    return (
        <MonitoringArea>
            {updateCsvFile?.numberItem===0 && <NotificationMessage>No Update have been happening</NotificationMessage>}
            {updateCsvFile?.numberItem>0 && <>
                <NotificationMessage>The last update has saved {updateCsvFile.numberItem} product changes</NotificationMessage>
                {RenderFileDownload(updateCsvFile)}
            </>}
        </MonitoringArea>
    )
}