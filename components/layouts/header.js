import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase/index";
import Router from "next/router";
import Link from "next/link";
import useUsers from "../hooks/useUsers";
import { Input } from "../ui/components";
import SearchUser from "../ui/searchUser";

const Header = () => {
  const { auth, firebase } = useContext(FirebaseContext);
  const logOut = async () => {
    await firebase.logOut();
    Router.replace("/login");
  };

  const { users } = useUsers();
  const [query, setQuery] = useState("");
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    if (query.trim() === "") return setUsers([]);
    setUsers(
      users.filter(u => {
        return u.username.toLowerCase().startsWith(query.toLowerCase());
      })
    );
  }, [query]);

  const onCleanBox = () => {
    setQuery("");
    setUsers([]);
  };

  return (
    <>
      <Menu>
        <ul className="nav">
          <li className="nav-logo">
            <Link href="/home">
              <i className="fab fa-instagram"> Clontagram</i>
            </Link>
          </li>

          <div className="search">
            <i className="fas fa-search"></i>
            <Input onChange={e => setQuery(e.target.value)} value={query} />
            <i
              className="fas fa-window-close"
              aria-hidden="true"
              onClick={onCleanBox}
            ></i>
          </div>

          <ul className="nav-rigth">
            {auth && (
              <>
                <li>
                  <Link href="/users">
                    <i className="fas fa-user-plus" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/upload">
                    <a className="fas fa-camera-retro" aria-hidden="true"></a>
                  </Link>
                </li>
                <li>
                  <Link href="/updateprofile">
                    <i className="fas fa-edit" aria-hidden="true"></i>
                  </Link>
                </li>
              </>
            )}
            <li onClick={logOut}>
              <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
            </li>
          </ul>
        </ul>
      </Menu>
      <Query>
        {Users.map(user => (
          <SearchUser user={user} key={user.uid} />
        ))}
      </Query>
    </>
  );
};

const Menu = styled.nav`
  position: fixed;
  background: white;
  width: 100%;
  top: 0;
  border-bottom: 1px solid #ccc;
  .nav {
    width: 95%;
    max-width: 1000px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
  }
  .nav-logo {
    flex-basis: 180px;
    font-size: 3rem;
    cursor: pointer;
  }
  .fa-window-close {
    color: red;
  }
  li {
    font-size: 26px;
    font-family: "PT Sans";
  }
  .fas {
    font-size: 20px;
    padding: 5px 8px;
  }
  .nav-rigth {
    flex-basis: 100px;
    display: flex;
    i {
      cursor: pointer;
    }
  }

  .search {
    position: relative;
    @media (max-width: 610px) {
      display: none;
    }
    input {
      height: 26px;
      padding-left: 28px;
    }
    .fa-search {
      position: absolute;
      font-size: 15px;
      top: 6px;
      left: 0;
    }
  }
`;

const Query = styled.div`
  width: 300px;
  position: fixed;
  top: 70px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: wrap column;
`;

export default Header;
