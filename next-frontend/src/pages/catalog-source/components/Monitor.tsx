import {useAccess} from "@/pages/user-authentication/hooks/useAccess";
import {useProductImport} from "../hooks/useProductImport";
import {StepForm} from "@/pages/global/styles/StepForm";
import {useCatalogSourceProduct} from "@/state/catalogSourceProductState";
import {MonitorDelete} from "@/pages/catalog-source/components/Monitoring/MonitorDelete"
import {MonitorUpdate} from "@/pages/catalog-source/components/Monitoring/MonitorUpdate";

export const Monitor: React.FC = () => {
    const {canDeleteProducts, canUpdateProducts, canMonitorData} = useAccess()
    const {setProductMonitoredAction } = useCatalogSourceProduct()
    const {importMonitored} = useProductImport()

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            setProductMonitoredAction(!importMonitored)
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <StepForm>
            <div className="main">
                <h2>Product Update Status</h2>
                {canMonitorData && !importMonitored && <button type="submit" onClick={handleSubmit}>
                    Launch Product Monitoring
                </button>
                }
                {importMonitored && <>The product updates are being monitored<br/>
                    <button type="submit" onClick={handleSubmit}>
                        Stop Product Monitoring
                    </button>
                    <div className="board">
                        {canUpdateProducts && <MonitorUpdate/>}
                        {canDeleteProducts && <MonitorDelete/>}
                    </div>
                </>}
            </div>
        </StepForm>
    )
}