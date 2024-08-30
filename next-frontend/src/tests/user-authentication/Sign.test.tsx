import { render, screen } from "@testing-library/react"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {Sign} from "@/pages/user-authentication/components/Sign";
const initialState = { anything: 'test' };
import mockRouter from 'next-router-mock';
import {MockedProvider} from "@apollo/client/testing";
import {expect} from "@jest/globals";

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

const mockStore = configureStore();
let store;

describe('<Sign>', () => {
    it.skip('renders config and title', () => {
        store = mockStore(initialState);
        mockRouter.push({pathname: '/'});

        const {container, debug} = render(
            <MockedProvider>
                <Provider store={store}>
                    <Sign/>
                </Provider>
            </MockedProvider>
        )
        //const button = container.querySelector('button')
        //debug(button)

        expect(screen.getByText('Sign Into Your Account')).toBeInTheDocument()
        expect(screen.getByText('Request a Password Reset')).toBeInTheDocument()
        //expect(button).toHaveTextContext('Sign In!')
    });
})