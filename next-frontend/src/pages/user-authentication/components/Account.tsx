import {UserDetails} from "./userDetails";
import {GridStyles} from "../styles/Grid";
import {useUser} from "@/pages/user-authentication/hooks/useUser";

export const Account: React.FC = () => {
    const user = useUser()

    return (
        <GridStyles>
            <UserDetails user={user} />
        </GridStyles>
    );
}
