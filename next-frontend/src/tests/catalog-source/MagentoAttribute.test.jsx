import {describe} from "@jest/globals";
import {render} from "@testing-library/react";
import {MagentoAttributes} from "@/pages/catalog-source/components/MappingAttribute"
import {MockedProvider} from "@apollo/client/testing";
import {useFakeMagentoAttributes} from "../hooks/useFakeMagentoAttributes";
import StateProvider from "../../state/StateProvider";

const {fakeCatalogSourceState} = useFakeMagentoAttributes()

describe('<MappingAttributes>', () => {
    it('Renders out the Magento Attribute step', () => {
        const { container, debug } = render(<MockedProvider>
            <StateProvider>
                <MagentoAttributes />
            </StateProvider>
        </MockedProvider>)

        console.log(debug())
    })
})