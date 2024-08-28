import {useUser} from '../hooks/useUser';
import {Form, Label} from "../../global/styles/Form";
import {useAllAccess} from "../../configuration/hooks/useAccess";

export const UserDetails: React.FC = () => {
    const user = useUser();
    const  accessSummary = useAllAccess()

    return (
        <Form data-testid="loggedInUser">
            <h2>Your details</h2>
            <fieldset>
                <Label htmlFor="name">Your Name</Label>
                <input
                    type="text"
                    name="name"
                    value={user?.name}
                    disabled
                />
                <Label htmlFor="email">Your Email</Label>
                <input
                    type="text"
                    name="name"
                    value={user?.email}
                    disabled
                />

                <Label htmlFor="email">Your access</Label>
                <textarea
                    name="access"
                    value={accessSummary}
                    disabled
                />
            </fieldset>
        </Form>
    )
}