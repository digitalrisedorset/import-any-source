import {RemoveProduct} from "../../pim/components/ImportProduct/ProductImportList/RemoveProduct";
import {RemotePimProduct} from "../../types/pim";
import {Table} from "../../pim/styles/GridStyle";
import {useProductImport} from "../../pim/hooks/useProductImport";

export const useProductGrid = (pimProductHeader: string[], pimProducts: any[]) => {
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
            const key = `col-${elt[0]}`
            return <td key={key} className={getClassname(elt[0])}>{getColumnContent(item, elt[1], elt[0])}</td>
        })
    }

    const getHeader = (item: any) => {
        return Object.values(item).map((elt: any) => {
            const label = elt.replaceAll('_', ' ');
            const key = `head-${elt}`
            return <th key={key} className={getClassname(elt)}>{label}</th>
        })
    }

    return <Table>
        <tr key="header-${Math.random()}">{getHeader(pimProductHeader)}</tr>
        {pimProducts.map((item: RemotePimProduct) => {
            const key = `row-${item.id}`
            return (
                <tr key={key} className={getStatusClassname(item)}>{getRow(item)}</tr>
            )}
        )}
    </Table>
}

export const useProductImportGrid = () => {
    const {pimProductHeader, pimProducts} = useProductImport()
    return useProductGrid(pimProductHeader, pimProducts)
}

export const useProductDeletedGrid = () => {
    const { pimDeletedProducts} = useProductImport()
    const pimProductHeader = ['sku', 'deleted']
    return useProductGrid(pimProductHeader, pimDeletedProducts)
}