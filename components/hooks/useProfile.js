import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { useRouter } from "next/router";

const useProfile = id => {
  const [profile, setProfile] = useState({});
  const [publications, setPublications] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      if (!id) return;
      const User = await firebase.db
        .collection("users")
        .doc(id)
        .get();
      if (User.exists) {
        setProfile(User.data());
        let Publications = [];
        await firebase.db
          .collection("posts")
          .where("userId", "==", id)
          .get()
          .then(function(publications) {
            publications.forEach(function(doc) {
              Publications.push({ ["id"]: doc.id, ...doc.data() });
            });
          });
        setPublications(Publications);
        return;
      }

      /* router.push("/"); */
    };
    getUser();
  }, [id]);
  return {
    user: profile,
    posts: publications
  };
};

export default useProfile;
