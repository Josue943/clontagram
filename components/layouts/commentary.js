import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const Commentary = ({ data }) => {
  const { username, comment, userId } = data;
  return (
    <Comment>
      <Link href="/profile/[id]" as={`/profile/${userId}`}>
        <strong>{username} </strong>
      </Link>
      <p>{comment.length >= 25 ? comment.slice(0, 25) + "..." : comment}</p>
    </Comment>
  );
};

const Comment = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  strong {
    margin-right: 10px;
    cursor: pointer;
  }
  p {
    flex: 1;
  }
`;

export default Commentary;
