import {useActions} from "../../global/hooks/useActions";
import {useSignOut} from "../graphql/useSignOut";

export const SignOut: React.FC = () => {
  const { removeUserAccess } = useActions()
  const [signout] = useSignOut();

  function handleSignout() {
    signout()
    removeUserAccess()
  }

  return (
    <button type="button" onClick={handleSignout}>
      Sign Out
    </button>
  );
}
