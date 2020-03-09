import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const userLogo = ({ user }) => {
  const { urlImage, username, uid } = user;
  return (
    <Logo>
      <div className="img-container">
        <Link href="/profile/[id]" as={`/profile/${uid}`}>
          <img src={urlImage ? urlImage : "/static/img/user.jpg"} />
        </Link>
      </div>
      <span>{username}</span>
    </Logo>
  );
};

const Logo = styled.div`
  cursor: pointer;
  width: 100%;
  height: 90px;
  margin-right: 10px;
  display: flex;
  flex-flow: wrap row;
  align-items: center;
  .img-container {
    height: 70px;
    width: 70px;
    img {
      border-radius: 50%;
    }
  }
  span {
    margin-left: 20px;
    font-size: 1.5rem;
  }
`;

export default userLogo;
