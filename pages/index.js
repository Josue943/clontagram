import Layout from "../components/layouts/layout";
import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { FirebaseContext } from "../firebase/index";
import useForm from "../components/hooks/useForm";
import { registerValidation } from "../components/validation/validation";
import {
  Form,
  Button,
  Input,
  ErrorField,
  Error
} from "../components/ui/components";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = () => {
  const [error, setError] = useState(false);
  const { auth, firebase } = useContext(FirebaseContext);
  const router = useRouter();
  if (auth) router.push("/upload");

  const user = {
    username: "",
    email: "",
    password: ""
  };

  const onRegister = async () => {
    try {
      await firebase.register(username, email, password);
      router.replace("/updateprofile");
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };
  const { values, errors, onHandleChange, onHandleSubmit } = useForm(
    user,
    registerValidation,
    onRegister
  );
  const { email, password, username } = values;
  return (
    <Layout>
      <Container>
        <img src="/static/img/celulares.png" className="logo" />
        <FormContainer>
          <h3 className="title-logo">Clontagram</h3>
          <p>Sign up to see photos and videos from your friends.</p>
          <Form onSubmit={onHandleSubmit}>
            {error && <Error>User already exists</Error>}
            <Input
              placeholder="Username"
              value={username}
              name="username"
              onChange={onHandleChange}
            />
            {errors.username && <ErrorField>{errors.username}</ErrorField>}
            <Input
              placeholder="Email"
              value={email}
              name="email"
              onChange={onHandleChange}
            />
            {errors.email && <ErrorField>{errors.email}</ErrorField>}
            <Input
              placeholder="Password"
              value={password}
              name="password"
              type="password"
              onChange={onHandleChange}
            />
            {errors.password && <ErrorField>{errors.password}</ErrorField>}
            <Button bgColor="true">Sign up</Button>
          </Form>
          <p>
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
          <span>
            Have an account?{" "}
            <Link href="/login">
              <a>Log in</a>
            </Link>
          </span>
        </FormContainer>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 95%;
  max-width: 800px;
  margin: 80px auto;
  display: flex;
  justify-content: center;
  .logo {
    flex: 1;
    margin-top: 30px;
    @media (max-width: 875px) {
      display: none;
    }
  }
`;
const FormContainer = styled.div`
  flex-basis: 290px;
  padding: 18px;
  margin-left: 20px;
  text-align: center;
  border-top: 0.5px solid #ccc;
  p {
    margin: 10px 0;
    color: #999999;
    font-weight: 700;
    letter-spacing: 0.8px;
    font-size: 1.7rem;
    :last-of-type {
      font-size: 1.5rem;
      font-weight: 100;
      letter-spacing: 0.3px;
      padding-bottom: 20px;
    }
  }
`;

export default Home;
