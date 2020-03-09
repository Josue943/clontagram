import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const Post = ({ post }) => {
  const { postImage, likes, id, comments } = post;
  return (
    <Link href="/post/[id]" as={`/post/${id}`}>
      <ImgContainer>
        <img src={postImage} />
        <div className="info">
          <span>
            <i className="fas fa-comment"></i>
            {comments.length}
          </span>
          <span>
            <i className="fas fa-heart"></i>
            {likes.length}
          </span>
        </div>
      </ImgContainer>
    </Link>
  );
};

const ImgContainer = styled.div`
  position: relative;
  cursor: pointer;
  height: 280px;
  img {
    object-fit: cover;
  }
  :hover {
    .info {
      background: rgba(74, 74, 74, 0.7);
      opacity: 1;
    }
  }
  .info {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      color: white;
      font-size: 2.2rem;
      i {
        padding: 0 6px;
      }
    }
    i + i {
      margin: 10px;
    }
  }
`;

export default Post;
