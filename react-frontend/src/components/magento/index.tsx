import ReadMagentoAttribute from "./ReadMagentoAttribute";
import ImportMagentoAttribute from "./ImportMagentoAttribute";
import {useQuery} from "@apollo/client";
import { useEffect, useContext } from "react"
import RemoveMagentoAttribute from "./RemoveMagentoAttribute";
import { ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY } from "../../graphql/keystone";

export function Magento() {
    //const appState = useContext(StateContext)
    //const magento = magentoModel(appState)
    // const { data, status, error, loading } = useQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
    //     variables: {}
    // });
    const data = {}

    useEffect(() => {
        function loadMagentoData() {
            //if (data) magento.setAttributes(data.magentoAttributes.items)
        }
        loadMagentoData()
    }, [data])

    //if (loading) return <p>Loading...</p>;
    //if (error) return <p>Error: {error.message}</p>;
    const status = ''

    return (
        <>
            {/*{status === "error" && <p>Error fetching data</p>}
            {status === "loading" && <p>Fetching data...</p>}*/}
            <ReadMagentoAttribute />
            <ImportMagentoAttribute />
            <RemoveMagentoAttribute />
        </>
    )
}