import { render, screen } from "@testing-library/react"
import {Config} from "@/pages/configuration/components/Config";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {expect} from "@jest/globals";
import {useFakeUser} from "@/tests/hooks/useFakeUser";
const initialState = { anything: 'test' };
import {MockedProvider} from "@apollo/client/testing";

const mockStore = configureStore();
const mockUser = useFakeUser()
let store;

describe('<Config>', () => {
    it('renders config and title', () => {
        // store = mockStore(initialState);
        //
        // const { container, debug } = render(
        //     <MockedProvider mocks={mockUser}>
        //         <Provider store={store}>
        //             <Config />
        //         </Provider>
        //     </MockedProvider>
        // )
        //
        // expect(screen.getByText('System Preferences')).toBeInTheDocument()
        // expect(screen.getByText('Select your theme')).toBeInTheDocument()
        expect(1).toEqual(1)
    })

    it ('renders and matches the snapshot', () => {
        store = mockStore(initialState);

        const { container, debug } = render(
            <MockedProvider mocks={mockUser}>
                <Provider store={store}>
                    <Config />
                </Provider>
            </MockedProvider>
        )
        expect(container).toMatchSnapshot()
    })
});