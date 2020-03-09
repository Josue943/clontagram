import { useState, useEffect } from "react";
import firebase from "../../firebase/index";

const useAuthentication = () => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        /*   firebase.db
          .collection("users")
          .doc(user.uid)
          .get()
          .then(data => setAuth({ ["uid"]: user.uid, ...data.data() })); */
        firebase.db
          .collection("users")
          .doc(user.uid)
          .onSnapshot(snapShot);
      } else {
        setAuth(null);
      }
    });
    return () => unsuscribe();
  }, []);
  const snapShot = snapshot => {
    //simpremente iteramos en los productos
    /*  const users = snapshot.docs.map(doc => {
      return {
        ["uid"]: doc.id,
        ["urlImage"]: doc.data().urlImage,
        ["username"]: doc.data().username
      };
    });
    setUsers(users); */
    const user = {
      ["uid"]: snapshot.id,
      /*  ["urlImage"]: snapshot.data().urlImage ? snapshot.data().urlImage : null,
      ["username"]: snapshot.data().username */
      ...snapshot.data()
    };
    setAuth(user);
    /* setAuth(user); */
  };

  return {
    auth
  };
};

export default useAuthentication;
