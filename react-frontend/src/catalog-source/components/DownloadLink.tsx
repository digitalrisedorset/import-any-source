import {DownlinkFile} from "../../types/catalog-source";
import {DownloadLink} from "../../global/styles/FlashMessage"


export const RenderFileDownload: React.FC<DownlinkFile> = (link: DownlinkFile) => (
    <DownloadLink to={link.fileurl}><span>{link.filename}</span></DownloadLink>
)