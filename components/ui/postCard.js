import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Like from "./like";
import Commentary from "../layouts/commentary";
import AddComment from "../ui/addComment";

const postCard = ({ post, comments: c }) => {
  const {
    user: { urlImage, username, uid },
    postImage,
    id
  } = post;

  const [comments, setComments] = useState(
    c
      .sort(function(a, b) {
        return b.created - a.created;
      })
      .slice(0, 2)
  );

  const newComments = comments => {
    setComments(comments.slice(0, 2));
  };

  return (
    <Card>
      <CardHeader>
        <div className="img-container">
          <Link href="/profile/[id]" as={`/profile/${uid}`}>
            <img src={urlImage ? urlImage : "/static/img/user.jpg"} />
          </Link>
        </div>
        <Link href="/profile/[id]" as={`/profile/${uid}`}>
          <span>{username}</span>
        </Link>
      </CardHeader>

      <CardBody>
        <Link href="/post/[id]" as={`/post/${id}`}>
          <div className="img-container">
            <img src={postImage} />
          </div>
        </Link>
      </CardBody>

      <CardFooter>
        <Like post={post} postId={id} />
        <div className="comments-container">
          {comments.map((item, i) => (
            <Commentary data={item} key={`${item.userId}-${i}`} />
          ))}
        </div>
        <div className="new-comment">
          <AddComment
            setComments={newComments}
            comments={comments}
            postId={id}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CardHeader = styled.div`
  height: 70px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-flow: wrap row;
  border-bottom: 1px solid #ccc;
  .img-container {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    cursor: pointer;
    img {
      border-radius: 50%;
    }
  }
  span {
    font-size: 1.4rem;
    font-weight: 700;
    cursor: pointer;
  }
`;

const CardBody = styled.div`
  .img-container {
    cursor: pointer;
    max-height: 500px;
    img {
      object-fit: contain;
      height: 100%;
      max-height: 500px;
    }
  }
`;

const CardFooter = styled.div`
  i {
    padding-top: 10px;
  }
  padding-left: 20px;
  .comments-container {
    padding: 10px;
  }
  .new-comment {
    input {
      width: 90%;
      @media (max-width: 700px) {
        width: 80%;
      }
    }
  }
`;
export default postCard;
