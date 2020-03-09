import React, { useContext } from "react";
import { Button } from "./components";
import { FirebaseContext } from "../../firebase";
import { firestore } from "firebase";

const Follow = ({ userId, user, setUser }) => {
  const { auth, firebase } = useContext(FirebaseContext);
  const { followers } = user;
  const onFollowUser = async () => {
    let newData = [];
    //user creador del post
    const DBpostUser = firebase.db.collection("users").doc(userId);
    //actual user
    const DBuser = firebase.db.collection("users").doc(auth.uid);
    //dislike
    if (followers.includes(auth.uid)) {
      newData = followers.filter(item => item !== auth.uid);
      //dislike
      setUser({ ...user, followers: newData });
      await DBpostUser.update(
        "followers",
        firestore.FieldValue.arrayRemove(auth.uid)
      );
      await DBuser.update(
        "following",
        firestore.FieldValue.arrayRemove(userId)
      );
    } else {
      newData = [...followers, auth.uid];
      setUser({ ...user, followers: newData });
      //like
      await DBpostUser.update(
        "followers",
        firestore.FieldValue.arrayUnion(auth.uid)
      );
      await DBuser.update("following", firestore.FieldValue.arrayUnion(userId));
    }
  };

  const followUser = () => {
    if (!auth) return false;
    if (followers && followers.includes(auth.uid)) return true;
    return false;
  };
  if (!auth || auth.uid === userId) return null;

  return (
    <Button bgColor="true" onClick={onFollowUser}>
      {followUser() ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Follow;
