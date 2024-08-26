import {UpdateModel} from "../../../models/UpdateImport";
import React from "react";
import {useActions} from "@/pages/global/hooks/useActions";

interface RemoveProps {
    sku: string
}

export const RemoveProduct: React.FC<RemoveProps> = ({sku}: RemoveProps) => {
    const updateModel = new UpdateModel()
    const { addFlashMessage,setCatalogSourceProductRemoved } = useActions()

    const handleRemoveProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        updateModel.updateProductImportStatus(sku).then(()=> {
            setCatalogSourceProductRemoved(sku)
            addFlashMessage(`The sku '${sku}' is marked as already imported`)
        })
    }

    return <button onClick={handleRemoveProduct}>Remove</button>
}