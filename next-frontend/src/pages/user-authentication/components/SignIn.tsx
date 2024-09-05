import {Form, Label} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {DisplayError} from '../../global/components/ErrorMessage';
import {useLoginUser} from "../hooks/useLoginUser";
import {useState} from "react";
import {useRouter} from "next/router";

export const SignIn: React.FC = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const setUserLogged = useLoginUser(inputs)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the form from submitting
    const res = await setUserLogged();
    resetForm();
    if (res !== undefined) {
      setErrorMessage(res.message)
    } else {
      router.push({pathname: '/'})
    }
  }

  return (
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign Into Your Account</h2>
        <DisplayError error={errorMessage} />
        <fieldset>
          <Label htmlFor="email">Email</Label>
          <input
            required
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />

          <Label htmlFor="password">Password</Label>
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />

          <button type="submit">Sign In!</button>
        </fieldset>
      </Form>
  );
}
