import {RemoveProduct} from "../../catalog-source/components/ImportProduct/ProductImportList/RemoveProduct";
import {DeletedCatalogSourceProduct, CatalogSourceProduct} from "../../types/catalog-source";
import {Table} from "../../catalog-source/styles/GridStyle";
import {useProductImport} from "../../catalog-source/hooks/useProductImport";

export const useProductGrid = (catalogSourceProductHeader: string[], catalogSourceProducts: CatalogSourceProduct[] | DeletedCatalogSourceProduct[]) => {
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

    const getColumnContent = (item: CatalogSourceProduct | DeletedCatalogSourceProduct, content: string, elt: string) => {
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

    const getStatusClassname = (item: CatalogSourceProduct | DeletedCatalogSourceProduct): string => {
        return item['import_status']
    }

    const getRow = (item: CatalogSourceProduct | DeletedCatalogSourceProduct) => {
        return Object.entries(item).map((elt: any) => {
            const key = `col-${elt[0]}`
            return <td key={key} className={getClassname(elt[0])}>{getColumnContent(item, elt[1], elt[0])}</td>
        })
    }

    const getHeader = (item: string[]) => {
        return Object.values(item).map((elt: string) => {
            const label = elt.replaceAll('_', ' ');
            const key = `head-${elt}`
            return <th key={key} className={getClassname(elt)}>{label}</th>
        })
    }

    const getRowKey = (): string => {
        return `header-${Math.random()}`
    }

    const getRowId = (item: CatalogSourceProduct | DeletedCatalogSourceProduct): string => {
        if ("id" in item) {
            return `row-${item.id}`
        }

        return `row-${item.sku}`
    }

    return <Table>
        <tbody>
            <tr key={getRowKey()}>{getHeader(catalogSourceProductHeader)}</tr>
            {catalogSourceProducts.map((item: CatalogSourceProduct | DeletedCatalogSourceProduct) => {
                    return (
                        <tr key={getRowId(item)} className={getStatusClassname(item)}>{getRow(item)}</tr>
                    )
                }
            )}
        </tbody>
    </Table>
}

export const useProductImportGrid = () => {
    const {catalogSourceProductHeader, catalogSourceProducts} = useProductImport()
    return useProductGrid(catalogSourceProductHeader, catalogSourceProducts)
}

export const useProductDeletedGrid = () => {
    const { CatalogSourceDeletedProducts} = useProductImport()
    const catalogSourceProductHeader = ['sku', 'deleted']
    return useProductGrid(catalogSourceProductHeader, CatalogSourceDeletedProducts)
}