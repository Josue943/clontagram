import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/index";

const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const { auth, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (!auth) return;
    const getUsers = () => {
      firebase.db
        .collection("users")
        .where("followers", "array-contains", auth.uid)
        .onSnapshot(snapShot);
    };
    getUsers();
  }, [auth]);

  const snapShot = snapshot => {
    //simpremente iteramos en los productos
    const users = snapshot.docs.map(doc => {
      return {
        ["uid"]: doc.id,
        ["urlImage"]: doc.data().urlImage,
        ["username"]: doc.data().username
      };
    });
    setUsers(users);
  };

  useEffect(() => {
    const getPost = () => {
      if (!users.length) return;
      /*  setPosts([]);
      var Posts = [];
      users.forEach(async item => {
        await firebase.db
          .collection("posts")
          .where("userId", "==", item.uid)
          .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              Posts.push({
                ["id"]: doc.id,
                ...doc.data(),
                user: {
                  ["uid"]: item.uid,
                  ["urlImage"]: item.urlImage,
                  ["username"]: item.username
                }
              });
            });
            setPosts([...Posts]);
          });
      }); */
      setPosts([]);
      var Posts = [];
      users.forEach(async item => {
        await firebase.db
          .collection("posts")
          .where("userId", "==", item.uid)
          .get()
          .then(function(publications) {
            publications.forEach(function(doc) {
              Posts.push({
                ["id"]: doc.id,
                ...doc.data(),
                user: {
                  ["uid"]: item.uid,
                  ["urlImage"]: item.urlImage,
                  ["username"]: item.username
                }
              });
            });
          });
        setPosts([...Posts]);
      });
    };
    getPost();
  }, [users]);
  return {
    users,
    posts: posts.sort(function(a, b) {
      return b.created - a.created;
    })
  };
};
export default useFeed;
