import React, { useState } from "react";
import styled from "@emotion/styled";
import Follow from "./follow";
import Link from "next/link";

const userCard = props => {
  const [user, setUser] = useState(props.user);
  const { urlImage, username, uid, followers } = user;
  return (
    <Card>
      <div className="img-container">
        <Link href="/profile/[id]" as={`/profile/${uid}`}>
          <img src={urlImage ? urlImage : "/static/img/user.jpg"} />
        </Link>
      </div>
      <div className="info">
        <Link href="/profile/[id]" as={`/profile/${uid}`}>
          <h5>{username}</h5>
        </Link>
        <p>Followers {followers.length}</p>
      </div>
      <Follow userId={uid} user={user} setUser={setUser} />
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-flow: wrap row;
  align-items: center;
  height: 130px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width: 535px) {
    height: 150px;
  }
  .img-container {
    height: 100px;
    width: 100px;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    padding: 10px;
    margin: 15px;
    h5 {
      font-size: 1.5rem;
      cursor: pointer;
    }
    p {
      color: gray;
    }
  }
  button {
    @media (max-width: 500px) {
      display: none;
    }
    justify-self: self-end;
    width: 80px;
    justify-content: flex-end;
  }
`;

export default userCard;
