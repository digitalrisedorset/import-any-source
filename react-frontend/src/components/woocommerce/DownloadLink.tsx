import {DownlinkFile} from "../../types/woocommerce";
import styled from "styled-components";
import {Link} from "react-router-dom";

const DownloadLink = styled(Link)`
  font-style: italic;
    color: green;
    margin-left: 10px;
`;

export const RenderFileDownload = (link: DownlinkFile) => (
    <DownloadLink to={link.fileurl}><span>{link.filename}</span></DownloadLink>
)