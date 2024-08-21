import {useUser} from '../hooks/useUser';
import {Form} from "../../global/styles/Form";
import {useAllAccess} from "../../configuration/hooks/useAccess";

export const UserDetails: React.FC = () => {
    const user = useUser();
    const  accessSummary = useAllAccess()

    return (
        <Form>
            <h2>Your details</h2>
            <fieldset>
                <label htmlFor="name">
                    Your Name
                    <input
                        type="text"
                        name="name"
                        value={user?.name}
                        disabled
                    />
                </label>
                <label htmlFor="email">
                    Your Email
                    <input
                        type="text"
                        name="name"
                        value={user?.email}
                        disabled
                    />
                </label>
                <label htmlFor="email">
                    Your access
                    <textarea
                        name="access"
                        value={accessSummary}
                        disabled
                    />
                </label>
            </fieldset>
        </Form>
    )
}