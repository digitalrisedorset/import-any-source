import mockRouter from "next-router-mock";
import {render, screen} from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing";
import {Provider} from "react-redux";
import {expect} from "@jest/globals";
import {Account} from "@/pages/user-authentication/components/Account";
import {useFakeUser} from "@/tests/hooks/useFakeUser";

const mockUser = useFakeUser()

describe('<Account>', () => {
    it('renders with user data', async () => {
        store = mockStore(initialState);
        mockRouter.push({pathname: '/'});

        const {container, debug} = render(
            <MockedProvider mocks={mockUser}>
                <Provider store={store}>
                    <Account/>
                </Provider>
            </MockedProvider>
        )
        //const button = container.querySelector('button')
        await screen.findByTestId('loggedInUser')

        expect(screen.getByText('Your details')).toBeInTheDocument()
        expect(screen.getByText('Your Name')).toBeInTheDocument()
        expect(screen.getByText('Your Email')).toBeInTheDocument()
        expect(screen.getByText('Your access')).toBeInTheDocument()
        //expect(button).toHaveTextContext('Sign In!')
    });

    it('renders the logged-in user account details and matches the snapshot', () => {
        store = mockStore(initialState);
        mockRouter.push({pathname: '/'});

        const mockUser = useFakeUser()

        const {container, debug} = render(
            <MockedProvider mocks={mockUser}>
                <Provider store={store}>
                    <Account/>
                </Provider>
            </MockedProvider>
        )
        const mockUser = useFakeUser()
        expect(container).toMatchSnapshot()
    })
})