import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import {
  Input,
  Button,
  Form,
  Error,
  ErrorField
} from "../components/ui/components";
import Layout from "../components/layouts/layout";
import Link from "next/link";
import useForm from "../components/hooks/useForm";
import { loginValidation } from "../components/validation/validation";
import Router from "next/router";
import firebase, { FirebaseContext } from "../firebase";

const login = () => {
  const { auth } = useContext(FirebaseContext);
  const [error, setError] = useState(false);
  if (auth) Router.push("/home");
  const user = {
    email: "",
    password: ""
  };

  const onLogin = async () => {
    try {
      await firebase.login(email, password);
      Router.replace("/home");
    } catch (error) {
      setError(true);
    }
  };
  const { values, errors, onHandleChange, onHandleSubmit } = useForm(
    user,
    loginValidation,
    onLogin
  );
  const { email, password } = values;

  return (
    <Layout>
      <Container>
        <h3 className="title-logo">Clontagram</h3>
        <Form onSubmit={onHandleSubmit}>
          {error && <Error>Unable to login</Error>}
          <Input
            placeholder="email"
            name="email"
            value={email}
            onChange={onHandleChange}
          />
          {errors.email && <ErrorField>{errors.email}</ErrorField>}
          <Input
            placeholder="password"
            name="password"
            value={password}
            onChange={onHandleChange}
            type="password"
          />
          {errors.password && <ErrorField>{errors.password}</ErrorField>}
          <Button bgColor="true">Log in</Button>
        </Form>
        <span>
          Don't have an account?{" "}
          <Link href="/">
            <a>Sign up</a>
          </Link>
        </span>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 290px;
  margin: 150px auto;
  padding: 18px;
  text-align: center;
  border-top: 0.5px solid #ccc;
`;

export default login;
