import { FormEvent} from "react"
import {RemoteWoocommerceProductProvider} from "../../models/RemoteWoocommerceProductProvider";

export default function ImportProduct(): JSX.Element {
    const remoteProductProvider = RemoteWoocommerceProductProvider()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            await remoteProductProvider.createKeystoneSeedProducts()
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <form>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Import Products
            </button>
        </form>
    )
}