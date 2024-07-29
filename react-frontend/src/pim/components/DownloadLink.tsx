import {DownlinkFile} from "../../types/pim";
import {DownloadLink} from "../../global/styles/FlashMessage"


export const RenderFileDownload = (link: DownlinkFile) => (
    <DownloadLink to={link.fileurl}><span>{link.filename}</span></DownloadLink>
)