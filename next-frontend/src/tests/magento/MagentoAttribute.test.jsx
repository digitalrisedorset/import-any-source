import {describe} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing";
import {ReadMagentoAttribute} from "../../pages/magento/components/ReadMagentoAttribute";
import {fakeMagentoAttribute} from "../fixtures/fakeMagentoAttributes";

const magentoAttributes = [
    fakeMagentoAttribute(),
    fakeMagentoAttribute(),
    fakeMagentoAttribute(),
    fakeMagentoAttribute(),
]

describe('<MappingAttributes>', () => {
    it('Renders out the Magento Attribute step', () => {
        const { container, debug } = render(<MockedProvider>
                <ReadMagentoAttribute magentoAttributes={magentoAttributes} />
        </MockedProvider>)

        expect(screen.getByText('Magento Attributes')).toBeInTheDocument()
        const cardAttributesList = screen.getAllByRole('magento-attribute-card');
        expect(cardAttributesList).toHaveLength(4)
    })

    it('Renders out the Magento Attribute step (snapshot)', () => {
        const { container, debug } = render(<MockedProvider>
            <ReadMagentoAttribute magentoAttributes={magentoAttributes} />
        </MockedProvider>)

        expect(container).toMatchSnapshot()
    })
})