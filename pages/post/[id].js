import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/ui/spinner";
import usePost from "../../components/hooks/usePost";
import Layout from "../../components/layouts/layout";
import { Button, Input } from "../../components/ui/components";
import styled from "@emotion/styled";
import Header from "../../components/layouts/header";
import { FirebaseContext } from "../../firebase";
import Commentary from "../../components/layouts/commentary";
import Link from "next/link";
import Follow from "../../components/ui/follow";
import Like from "../../components/ui/like";
import AddComment from "../../components/ui/addComment";

const Post = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [Post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { auth } = useContext(FirebaseContext);
  const {
    query: { id }
  } = router;
  const { post, userProfile } = usePost(id);

  useEffect(() => {
    if (!userProfile) return;
    setUser(userProfile);
    setPost(post);
    setComments(
      post.comments.sort(function(a, b) {
        return b.created - a.created;
      })
    );
  }, [userProfile]);

  const { urlImage, username } = user;
  const { postImage, userId, description } = Post;
  console.log(post);

  return (
    <Layout>
      <Header />
      {!Object.keys(Post).length ? (
        <Spinner />
      ) : (
        <Container>
          <div className="img-container">
            <img src={postImage} />
          </div>
          {user && (
            <div className="post-info">
              <div className="header">
                <div className="user-image">
                  <Link href="/profile/[id]" as={`/profile/${userId}`}>
                    <img src={urlImage ? urlImage : "/static/img/user.jpg"} />
                  </Link>
                </div>
                <span>{username}</span>
                <Follow userId={userId} setUser={setUser} user={user} />
              </div>
              <div className="post-comments">
                <div className="comments">
                  {comments.map((item, i) => (
                    <Commentary data={item} key={`${item.userId}-${i}`} />
                  ))}
                </div>
                <p>
                  <Like post={post} postId={id} />
                  <span className="span-comment">
                    {" "}
                    <i className="fas fa-comment"></i>
                    {comments.length}
                  </span>
                </p>
                {auth && (
                  <AddComment
                    setComments={setComments}
                    comments={comments}
                    postId={id}
                  />
                )}
              </div>
            </div>
          )}
        </Container>
      )}
    </Layout>
  );
};

const Container = styled.div`
  max-width: 900px;
  width: 95%;
  margin: 100px auto;
  display: flex;
  flex-flow: wrap row;
  @media (max-width: 730px) {
    flex-flow: column wrap;
    .comments {
      display: none;
    }
    .header {
      display: none !important;
      background: yellow;
    }
    .form-control {
      display: none !important;
    }
  }
  .img-container {
    flex: 1;
    height: 500px;
    @media (max-width: 700px) {
      max-height: 300px;
    }
    img {
      object-fit: contain;
    }
  }
  .post-info {
    flex-basis: 400px;
    display: flex;
    flex-flow: wrap column;
  }
  .header {
    display: flex;
    padding: 10px;
    flex-flow: wrap row;
    height: 100px;
    align-items: center;

    .user-image {
      flex-basis: 60px;
      height: 60px;
      img {
        border-radius: 50%;
        cursor: pointer;
      }
    }
    span {
      padding: 10px 15px;
    }
    button {
      padding: 5px;
      width: 80px;
    }
  }
  .post-comments {
    flex: 1;
    display: flex;
    flex-flow: wrap column;
    .span-comment {
      i {
        font-size: 2.3rem;
        padding: 5px 10px;
        margin-top: 10px;
      }
      font-size: 2.2rem;
      display: none;
      @media (max-width: 730px) {
        display: initial;
      }
    }
    .comments {
      flex: 1;
      padding: 10px;
      max-height: 300px;
      overflow-y: scroll;
    }
  }
`;

export default Post;
