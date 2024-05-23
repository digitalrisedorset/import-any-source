import {LazyQueryResultTuple, OperationVariables, useLazyQuery} from "@apollo/client";
import {
    ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY,
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY
} from "../../graphql/keystone";
import {WoocommerceAttributeProvider} from "../../models/KeystoneWoocommerceAttributeProvider"
import {MagentoAttributeProvider} from "../../models/KeystoneMagentoAttributeProvider"
import {MappingModel} from "../../models/MappingDataProvider"
import {KeystoneMagentoAttributeData, WoocommerceAttributeData} from "../../types/keystone";

export default function ImportProduct(): JSX.Element {
    const [getWoocommerceAttributeList]: LazyQueryResultTuple<WoocommerceAttributeData, OperationVariables> = useLazyQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });
    const [getMagentoAttributeList]: LazyQueryResultTuple<KeystoneMagentoAttributeData, OperationVariables> = useLazyQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            const woocommerceData = await getWoocommerceAttributeList();
            const magentoData = await getMagentoAttributeList();

            if (magentoData?.data && woocommerceData?.data) {
                const magento = new MagentoAttributeProvider(magentoData.data.magentoAttributes)
                const woocommerce = new WoocommerceAttributeProvider(woocommerceData.data.woocommerceAttributes)

                const MappingData = new MappingModel(woocommerce.getListWithMapping(), magento.getListWithMapping())
                MappingData.createAttributesImport()
            }
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