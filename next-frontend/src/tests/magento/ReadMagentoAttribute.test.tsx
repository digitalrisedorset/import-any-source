import { render, screen } from "@testing-library/react"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {expect} from "@jest/globals";
import {useFakeUser} from "@/tests/hooks/useFakeUser";
const initialState = { anything: 'test' };
import {MockedProvider} from "@apollo/client/testing";
import {Magento} from "@/pages/magento/components";
import {useFakeMagentoAttributes} from "@/tests/hooks/useFakeMagentoAttributes";

const mockStore = configureStore();
const mockUser = useFakeUser()
//const mockMagentoAttributes = useFakeMagentoAttributes()
let store;

describe('<Magento>', () => {
    it.skip('renders magento attributes and title', () => {
        store = mockStore(initialState);

        const { container, debug } = render(
            <MockedProvider mocks={mockUser}>
                <Provider store={store}>
                    <Magento />
                </Provider>
            </MockedProvider>
        )

        expect(screen.getByText('Magento Attributes')).toBeInTheDocument()
    })

    it.skip('renders magento attributes and matches the snapshot', () => {
        store = mockStore(initialState);

        const { container, debug } = render(
            <MockedProvider mocks={mockUser}>
                <Provider store={store}>
                    <Magento />
                </Provider>
            </MockedProvider>
        )
        expect(container).toMatchSnapshot()
    })
});