import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const searchUser = ({ user }) => {
  const { urlImage, username, uid } = user;
  return (
    <Card>
      <div className="img-container">
        <Link href="/profile/[id]" as={`/profile/${uid}`}>
          <img src={urlImage ? urlImage : "/static/img/user.jpg"} />
        </Link>
      </div>
      <div className="info">
        <Link href="/profile/[id]" as={`/profile/${uid}`}>
          <span>{username}</span>
        </Link>
      </div>
    </Card>
  );
};

const Card = styled.div`
  background: red;
  height: 80px;
  width: 200px;
  padding: 10px;
  display: flex;
  flex-flow: wrap row;
  align-items: center;
  border: 1px solid #ccc;
  background: white;
  .img-container {
    height: 60px;
    width: 60px;
    cursor: pointer;
    img {
      border-radius: 50%;
    }
  }
  span {
    margin-left: 20px;
  }
`;

export default searchUser;
