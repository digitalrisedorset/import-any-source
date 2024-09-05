import {useUserConfiguration} from "@/pages/user-authentication/hooks/useUser";

export function useAccess() {
    const { accessEnabled } = useUserConfiguration()

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