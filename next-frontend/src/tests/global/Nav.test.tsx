import { render, screen } from "@testing-library/react"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {expect} from "@jest/globals";
import {useFakeNonLoggedInUser, useFakeUser} from "@/tests/hooks/useFakeUser";
const initialState = { anything: 'test' };
import {MockedProvider} from "@apollo/client/testing";
import {Nav} from "@/pages/global/components/Nav";
import Router from 'next/router';
import {CatalogSourceState} from "@/pages/types/states";
import {configurationReducer} from "@/state/configurationSlice";
import {catalogSourceProductReducer} from "@/state/catalogSourceProductSlice";

const catalogSourceState: CatalogSourceState = {
    name: 'forest',
    active: true,
    magentoMapping: 3,
    numberCatalogSourceAttributes: 5,
    ignoredAttributes: 10
}

const mockStore = configureStore({
    reducer: {
        catalogSourceProduct: catalogSourceState,
    }
});
const mockUser = useFakeUser()
const mockNonLoggedInUser = useFakeNonLoggedInUser()
let store;

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: ''
        };
    },
}));

describe('<Nav>', () => {
    it('renders Navigation bar for loggedIn user and title', () => {
        store = mockStore(catalogSourceState);

        const {container, debug} = render(
            <MockedProvider mocks={mockUser}>
                <Provider store={store}>
                    <Nav/>
                </Provider>
            </MockedProvider>
        )

        expect(screen.getByText('Sign Out')).toBeInTheDocument()
        expect(screen.getByText('Configuration')).toBeInTheDocument()
    })

    it('renders Navigation for loggedIn user and matches the snapshot', () => {
        store = mockStore(catalogSourceState);

        const { container, debug } = render(
            <MockedProvider mocks={mockUser}>
                <Provider store={store}>
                    <Nav />
                </Provider>
            </MockedProvider>
        )
        expect(container).toMatchSnapshot()
    })
});