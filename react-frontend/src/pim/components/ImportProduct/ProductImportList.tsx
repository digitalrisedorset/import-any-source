import {useProductImport} from "../../hooks/useProductImport";
import {Table} from '../../styles/GridStyle';

export const ProductImportList = () => {
    const {pimProductHeader, pimProducts} = useProductImport()

    if (!pimProducts) return <></>

    const getClassname = (elt: string) => {
        let result = ''
        switch (elt) {
            case 'store_view_code':
            case 'attribute_set_code':
            case 'product_websites':
            case 'price':
            case 'special_price':
            case 'status':
                result = 'small'
                break;
            case 'sku':
                result = 'medium'
                break
            case 'name':
            case 'short_description':
            case 'description':
                result = 'truncated'
                break
            default:
                result = 'medium'
        }

        return `${elt} ${result}`
    }

    const getColumnContent = (content: string, elt: string) => {
        switch (elt) {
            case 'short_description':
            case 'description':
                return content.substring(0, 45) + "...";
                break
            default:
                return content
        }
    }

    const getRow = (item: any) => {
        console.log('getRow', Object.entries(item))
        return Object.entries(item).map((elt: any) => {
            return <td className={getClassname(elt[0])}>{getColumnContent(elt[1], elt[0])}</td>
        })
    }

    const getHeader = (item: any) => {
        return Object.values(item).map((elt: any) => {
                const label = elt.replaceAll('_', ' ');
                return <th className={getClassname(elt)}>{label}</th>
            })
    }

    return (
        <Table>
            {pimProducts?.length>0 && <tr>{getHeader(pimProductHeader)}</tr>}
            {pimProducts?.length>0 && pimProducts.map((item: any) =>
                <tr>{getRow(item)}</tr>
            )}
        </Table>
    );
};