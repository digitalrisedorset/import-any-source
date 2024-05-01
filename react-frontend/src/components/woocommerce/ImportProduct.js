import {magentoModel} from "../../models/MagentoData";
import {woocommerceModel} from "../../models/WoocommerceData";
import {useLazyQuery} from "@apollo/client";
import {mappingModel} from '../../models/MappingData'
import {
    ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY,
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY
} from "../../graphql/keystoneQuery";

export default function ImportProduct() {
    const [getWoocommerceAttributeList, { loading, attributes }] = useLazyQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });
    const [getMagentoAttributeList, { loading2, attributes2 }] = useLazyQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const woocommerceData = await getWoocommerceAttributeList();
            const woocommerce = woocommerceModel()
            woocommerce.setAttributes(woocommerceData.data.woocommerceAttributes)
            const magentoData = await getMagentoAttributeList();
            const magento = magentoModel()
            magento.setAttributes(magentoData.data.magentoAttributes)

            const MappingData = mappingModel(woocommerce.getListWithMapping(), magento.getListWithMapping())
            MappingData.createAttributesImport()
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <form>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Import Magento Products
            </button>
        </form>
    )
}