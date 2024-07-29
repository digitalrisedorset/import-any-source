import {useUser} from "../../user-authentication/hooks/useUser";

export function useAccess() {
   // const { pimImportState } = useTypedSelector((state) => state.userLogin)
    const user = useUser()

    return {
        canCreateProducts: user?.role?.canCreateProducts,
        canUpdateProducts: user?.role?.canUpdateProducts,
        canDeleteProducts: user?.role?.canDeleteProducts,
        canImportPIMAttribute: user?.role?.canImportPIMAttribute,
        canImportMagentoAttribute: user?.role?.canImportMagentoAttribute,
        canMapAttribute: user?.role?.canMapAttribute,
        canImportProduct: user?.role?.canImportProduct,
        canMonitorData: user?.role?.canUpdateProducts || user?.role?.canDeleteProducts,
        canSetupImport: user?.role?.canImportPIMAttribute || user?.role?.canImportMagentoAttribute || user?.role?.canMapAttribute || user?.role?.canImportProduct
    }
}

export function useAllAccess() {
    const user = useUser()
    const access = user && Object.keys(user?.role).filter((value) => typeof value==='string' && value.indexOf('can')>-1)

    return access.join()
}