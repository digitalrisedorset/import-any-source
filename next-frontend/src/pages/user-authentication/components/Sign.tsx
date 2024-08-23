import {RequestReset} from './RequestReset';
import {SignIn} from './SignIn';
import {GridStyles} from "../styles/Grid";

export const Sign: React.FC = () => {
    return (
        <GridStyles>
            <SignIn />
            <RequestReset />
        </GridStyles>
    );
}
