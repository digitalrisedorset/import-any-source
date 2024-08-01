import {RemoveProduct} from "../../pim/components/ImportProduct/ProductImportList/RemoveProduct";
import {RemotePimProduct} from "../../types/pim";
import {Table} from "../../pim/styles/GridStyle";
import {useProductImport} from "../../pim/hooks/useProductImport";

export const useProductGrid = (pimProductHeader: string[], pimProducts: RemotePimProduct[]) => {
    //const {pimProductHeader, pimProducts} = useProductImport()
    const getClassname = (elt: string) => {
        let result = ''
        switch (elt) {
            case 'store_view_code':
            case 'attribute_set_code':
            case 'product_websites':
            case 'status':
                result = 'small'
                break;
            case 'price':
            case 'special_price':
                result = 'small price'
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

    const getColumnContent = (item: any, content: string, elt: string) => {
        switch (elt) {
            case 'short_description':
            case 'description':
                return content.substring(0, 45) + "...";
            case 'import_status':
                const sku = item['sku'] as string
                return (content === 'not_needed')?<RemoveProduct sku={sku} />:content
            default:
                return content
        }
    }

    const getStatusClassname = (item: any): string => {
        return item['import_status']
    }

    const getRow = (item: RemotePimProduct) => {
        return Object.entries(item).map((elt: any) => {
            return <td className={getClassname(elt[0])}>{getColumnContent(item, elt[1], elt[0])}</td>
        })
    }

    const getHeader = (item: any) => {
        return Object.values(item).map((elt: any) => {
            const label = elt.replaceAll('_', ' ');
            return <th className={getClassname(elt)}>{label}</th>
        })
    }

    return <Table>
        <tr>{getHeader(pimProductHeader)}</tr>
        {pimProducts.map((item: RemotePimProduct) =>
            <tr className={getStatusClassname(item)}>{getRow(item)}</tr>
        )}
    </Table>
}

export const useProductImportGrid = () => {
    const {pimProductHeader, pimProducts} = useProductImport()
    return useProductGrid(pimProductHeader, pimProducts)
}

export const useProductUpdateGrid = () => {
    const {pimProductHeader, pimProducts} = useProductImport()
    return useProductGrid(pimProductHeader, pimProducts)
}