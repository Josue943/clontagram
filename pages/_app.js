import App from "next/app";
import firebase, { FirebaseContext } from "../firebase/index";
import useAuthentication from "../components/hooks/useAuthentication";

const MyApp = ({ Component, pageProps }) => {
  const { auth } = useAuthentication();

  return (
    <FirebaseContext.Provider value={{ firebase, auth }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
