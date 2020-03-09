import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/layouts/layout";
import { useRouter } from "next/router";
import Header from "../../components/layouts/header";
import styled from "@emotion/styled";
import Post from "../../components/layouts/post";
import Spinner from "../../components/ui/spinner";
import useProfile from "../../components/hooks/useProfile";
import Follow from "../../components/ui/follow";
import { A } from "../../components/ui/components";
import { FirebaseContext } from "../../firebase";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const { auth } = useContext(FirebaseContext);
  const {
    query: { id }
  } = router;
  const { user: profile, posts } = useProfile(id);

  useEffect(() => {
    if (!profile) return;
    setUser(profile);
  }, [profile]);

  const {
    description,
    fullName,
    urlImage,
    followers,
    following,
    username
  } = user;

  return (
    <Layout>
      <Header />
      {!Object.keys(user).length ? (
        <Spinner />
      ) : (
        <Container>
          <div className="header">
            <div className="img-container">
              <img src={urlImage ? urlImage : "/static/img/user.jpg"} />
            </div>
            <div className="profile-info">
              <div className="username">
                <span>{username}</span>
                <Follow user={user} userId={id} setUser={setUser} />
              </div>
              <div className="info">
                <span>
                  {" "}
                  <strong>{posts.length}</strong> publications
                </span>
                <span>
                  <strong>{followers && followers.length}</strong> followers
                </span>
                <span>
                  <strong>{following && following.length}</strong> following
                </span>
              </div>
              <div className="description">
                <span>{fullName}</span>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="posts">
            <h5>Posts</h5>

            {posts.length === 0 && id === auth.uid ? (
              <Link href="/upload">
                <A>Add a post</A>
              </Link>
            ) : (
              <div className="post-container">
                {posts.map(post => (
                  <Post post={post} key={post.id} />
                ))}
              </div>
            )}
          </div>
        </Container>
      )}
    </Layout>
  );
};
const Container = styled.div`
  max-width: 1000px;
  width: 95%;
  margin: 100px auto;
  .header {
    display: flex;
    flex-flow: wrap row;
    align-items: center;
  }
  .img-container {
    flex-basis: 200px;
    margin-right: 40px;
    padding: 30px;
    height: 200px;
    img {
      border-radius: 50%;
      object-fit: cover;
    }
  }
  /* */
  .profile-info {
    flex: 1;
    display: flex;
    flex-flow: wrap column;
  }
  /* */
  .username {
    display: flex;
    align-items: center;
    span {
      font-size: 2.5rem;
      margin-right: 20px;
    }
    button {
      flex-basis: 20px;
    }
  }
  /* */
  .info {
    span {
      margin-right: 25px;
      @media (max-width: 500px) {
        display: block;
      }
    }
  }
  /* */
  .description {
    margin: 15px 0;
    span {
      font-size: 1.8rem;
      font-weight: 600;
    }
    p {
      padding-top: 5px;
      display: block;
    }
  }
  /* */
  h5 {
    text-align: center;
    font-size: 1.6rem;
  }
  .post-container {
    display: grid;
    margin-top: 20px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: 1fr;
    grid-gap: 3rem;
    height: 100%;
    position: inherit;
  }
  .posts {
    a {
      margin: 20px auto;
    }
  }
`;

export default Profile;
