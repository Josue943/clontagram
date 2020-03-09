import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";

const usePost = id => {
  const [post, setPost] = useState(null);
  const [userProfile, setuserProfile] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const getPost = async () => {
      if (!id) return;
      const Post = await firebase.db
        .collection("posts")
        .doc(id)
        .get();
      if (Post.exists) {
        setPost(Post.data());
        await firebase.db
          .collection("users")
          .doc(Post.data().userId)
          .get()
          .then(data => setuserProfile(data.data()));
      }
    };
    getPost();
  }, [id]);
  return {
    post,
    userProfile
  };
};

export default usePost;
