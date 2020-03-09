import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { Input, Button } from "./components";
import { firestore } from "firebase";
import styled from "@emotion/styled";
import Router from "next/router";

const AddComment = ({ setComments, comments, postId }) => {
  const [comment, setComment] = useState("");
  const { auth, firebase } = useContext(FirebaseContext);

  const onHandleComment = async e => {
    if (!auth) return Router;
    e.preventDefault();
    if (comment.trim() === "") {
      return;
    }
    const Comment = {
      userId: auth.uid,
      username: auth.username,
      comment: comment.trim(),
      created: Date.now()
    };
    let newComments = [];
    newComments = [Comment, ...comments];
    setComments(newComments);
    setComment("");
    await firebase.db
      .collection("posts")
      .doc(postId)
      .update("comments", firestore.FieldValue.arrayUnion(Comment));
  };

  return (
    <Form onSubmit={onHandleComment}>
      <Input
        placeholder="Add a comment...."
        value={comment}
        name="c"
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      <Button>Post</Button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  align-self: flex-end;
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
  align-items: center;
  input {
    width: 80%;
    height: 30px;
  }
  button {
    width: 50px;
  }
`;

export default AddComment;
