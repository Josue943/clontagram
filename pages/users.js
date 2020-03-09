import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layouts/layout";
import Header from "../components/layouts/header";
import useUsers from "../components/hooks/useUsers";
import Spinner from "../components/ui/spinner";
import UserCard from "../components/ui/userCard";
import { FirebaseContext } from "../firebase";
import styled from "@emotion/styled";

const users = () => {
  const { users } = useUsers();
  const { auth } = useContext(FirebaseContext);
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    if (users.length === 0 || !auth) return;
    setUsers(users.filter(user => user.uid !== auth.uid));
  }, [users, auth]);
  return (
    <Layout>
      {users.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <Container>
            {Users.map(user => (
              <UserCard user={user} key={user.uid} />
            ))}
          </Container>
        </>
      )}
    </Layout>
  );
};

const Container = styled.div`
  height: 100%;
  width: 60%;
  max-width: 600px;
  margin: 130px auto;
  display: grid;
  grid-gap: 2rem;
`;

export default users;
