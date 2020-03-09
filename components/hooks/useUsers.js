import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";

const useUsers = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = () => {
      firebase.db.collection("users").onSnapshot(snapShot);
    };
    getUsers();
  }, []);
  const snapShot = snapshot => {
    //simpremente iteramos en los productos
    const users = snapshot.docs.map(doc => {
      return {
        uid: doc.id,
        ...doc.data()
      };
    });
    setUsers(users);
  };
  return {
    users
  };
};

export default useUsers;
