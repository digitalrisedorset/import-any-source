import {MonitoringArea} from '../styles/MappingScreen';
import {useEffect, useState} from "react";
import {UpdateModel} from "../../models/UpdateImport"
import {useActions} from "../../hooks/useActions";

const MINUTE_MS = 60000;

export function MonitorUpdate(): JSX.Element {
    const [monitor, setMonitor] = useState(false)
    const [count, setCount] = useState(0)
    const { addFlashMessage } = useActions()
    const updateModel = new UpdateModel()

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await updateModel.createUpdateImport()
            if (response === undefined) {
                addFlashMessage('An error occured when the csv import file was created')
            } else {
                if (response.data?.count === 0) {
                    addFlashMessage(`No product were updated in the last minute`)
                } else {
                    addFlashMessage(`${response.data?.count} were successfully registered for update`)
                }
            }
        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [monitor])

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            setMonitor(!monitor)
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <MonitoringArea>
            <form>
                <h2>Product Update Status</h2>
                {!monitor && <button type="submit" onClick={handleSubmit}>
                    Launch Product Monitoring
                </button>}
                {monitor && <>The product update are being monitored<br/>
                    <button type="submit" onClick={handleSubmit}>
                        Stop Product Monitoring
                    </button>
                </>}
            </form>
        </MonitoringArea>
    )
}