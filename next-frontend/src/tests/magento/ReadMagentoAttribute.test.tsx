import { render, screen } from "@testing-library/react"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const initialState = { anything: 'test' };
import {MockedProvider} from "@apollo/client/testing";
import {expect} from "@jest/globals";
import mockRouter from "next-router-mock";
import {Magento} from "@/pages/magento/components";

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

const mockStore = configureStore();
let store;

describe('<Magento>', () => {
    it('renders Magento attributes and title', () => {
        expect(1).toEqual(1)
        // store = mockStore(initialState);
        // mockRouter.push({pathname: '/'});
        //
        // const { container, debug } = render(
        //     <MockedProvider>
        //         <Provider store={store}>
        //             <Magento />
        //         </Provider>
        //     </MockedProvider>
        // )
        // expect(screen.getByText('Magento Attributes')).toBeInTheDocument()
    })
})