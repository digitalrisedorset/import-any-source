import {useAppSelector} from "@/state/store";

export function useAccess() {
    const { accessEnabled } = useAppSelector((state) => state.configuration);

    return {
        canCreateProducts: accessEnabled?.canCreateProducts,
        canUpdateProducts: accessEnabled?.canUpdateProducts,
        canDeleteProducts: accessEnabled?.canDeleteProducts,
        canImportSourceAttribute: accessEnabled?.canImportSourceAttribute,
        canImportMagentoAttribute: accessEnabled?.canImportMagentoAttribute,
        canMapAttribute: accessEnabled?.canMapAttribute,
        canImportProduct: accessEnabled?.canImportProduct,
        canMonitorData: accessEnabled?.canUpdateProducts || accessEnabled?.canDeleteProducts,
        canSetupImport: accessEnabled?.canImportSourceAttribute || accessEnabled?.canImportMagentoAttribute || accessEnabled?.canMapAttribute || accessEnabled?.canImportProduct
    }
}

export function useAllAccess() {
    const { accessEnabled } = useAppSelector((state) => state.configuration);
    const access =  Object.entries(accessEnabled).filter((item: any) => (item[1]===true)).map(item => {
       return item[0]
    })

    return access.join()
}