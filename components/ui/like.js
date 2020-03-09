import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { useRouter } from "next/router";
import { firestore } from "firebase";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Like = ({ post, postId }) => {
  const { auth, firebase } = useContext(FirebaseContext);
  const [likes, setLikes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (post) setLikes(post.likes);
  }, [post]);

  const likeStatus = () => {
    if (!auth) return false;
    if (likes.includes(auth.uid)) return true;
    return false;
  };

  const onHandleLike = async () => {
    if (!auth) return router.push("/login");
    let Likes = [];

    if (likes.includes(auth.uid)) {
      Likes = likes.filter(item => item !== auth.uid);
      await firebase.db
        .collection("posts")
        .doc(postId)
        .update("likes", firestore.FieldValue.arrayRemove(auth.uid));
    } else {
      Likes = [...likes, auth.uid];
      await firebase.db
        .collection("posts")
        .doc(postId)
        .update("likes", firestore.FieldValue.arrayUnion(auth.uid));
    }
    setLikes(Likes);
  };

  return (
    <>
      <LikeContainer>
        <i
          onClick={onHandleLike}
          className={likeStatus() ? "fas fa-heart" : "far fa-heart"}
        ></i>
        {likes.length} Likes
      </LikeContainer>
      <SpanDate>{formatDistanceToNow(new Date(post.created))}</SpanDate>
    </>
  );
};
const LikeContainer = styled.span`
  .fa-heart {
    cursor: pointer;
  }

  .fas {
    color: red;
  }
  i {
    font-size: 2.3rem;
    padding: 5px 10px;
    margin-top: 10px;
  }
`;

const SpanDate = styled.span`
  color: gray;

  padding: 5px 10px;
  @media (min-width: 730px) {
    display: block;
  }
`;

export default Like;
