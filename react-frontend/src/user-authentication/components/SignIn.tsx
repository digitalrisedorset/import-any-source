import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {DisplayError} from '../../global/components/ErrorMessage';
import {useNavigate} from "react-router-dom";
import {useLoginUser} from "../graphql/useLoginUser";
import {useState} from "react";

export const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const setUserLogged = useLoginUser(inputs)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the form from submitting
    const res = await setUserLogged();
    resetForm();
    if (res === undefined) {
      navigate(`/`);
    } else {
      setErrorMessage(res.message)
    }
  }

  return (
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign Into Your Account</h2>
        <DisplayError error={errorMessage} />
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              required
              type="email"
              name="email"
              placeholder="Your Email Address"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign In!</button>
        </fieldset>
      </Form>
  );
}
