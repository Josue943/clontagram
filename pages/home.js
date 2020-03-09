import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layouts/layout";
import Header from "../components/layouts/header";
import useFeed from "../components/hooks/useFeed";
import styled from "@emotion/styled";
import UserLogo from "../components/ui/userLogo";
import Spinner from "../components/ui/spinner";
import PostCard from "../components/ui/postCard";
import { FirebaseContext } from "../firebase";
import Link from "next/link";
import { A } from "../components/ui/components";

const home = () => {
  const [Posts, setPosts] = useState([]);
  const { users, posts } = useFeed();
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    if (posts.length === 0) return;
    setPosts(posts);
  }, [posts]);

  return (
    <Layout>
      {posts.length === 0 && !auth ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <MainContainer>
            {auth && auth.following.length === 0 ? (
              <New>
                <Link href="/users">
                  <A>Add some users</A>
                </Link>
              </New>
            ) : (
              <div className="post-container">
                {Posts.map(post => (
                  <PostCard
                    post={post}
                    key={post.id}
                    comments={post.comments}
                  />
                ))}
              </div>
            )}
            {auth && (
              <div className="user">
                <UserLogo user={auth} key={auth.uid} />
                <HomeHeader>
                  {users.map(user => (
                    <UserLogo user={user} key={user.uid} />
                  ))}
                </HomeHeader>
              </div>
            )}
          </MainContainer>
        </>
      )}
    </Layout>
  );
};

const MainContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 130px auto;
  display: flex;
  .post-container {
    width: 70%;
    margin: auto;
    height: 100%;

    @media (max-width: 900px) {
      width: 90%;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .user {
    @media (max-width: 900px) {
      display: none;
    }
  }
`;

const HomeHeader = styled.div`
  height: auto;
  width: 230px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  border: 1px solid #ccc;
  border-width: 1px 0 1px 0;
`;

const New = styled.div`
  margin: 100px;
  display: flex;
  justify-content: center;
  width: 70%;
`;

export default home;
