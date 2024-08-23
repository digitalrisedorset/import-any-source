import {useSignOut} from "../graphql/useSignOut";

export const SignOut: React.FC = () => {
  const [signout] = useSignOut();

  function handleSignout() {
    signout()
  }

  return (
    <button type="button" onClick={handleSignout}>
      Sign Out
    </button>
  );
}
