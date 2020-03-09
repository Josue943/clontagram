import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    //this.App = app();
  }
  //requests
  async register(username, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await newUser.user.updateProfile({
      displayName: username
    });

    return await firebase.db
      .collection("users")
      .doc(newUser.user.uid)
      .set({
        following: [],
        followers: [],
        description: "",
        username
      });
  }
  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
