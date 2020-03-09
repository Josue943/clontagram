import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layouts/layout";
import Header from "../components/layouts/header";
import { FirebaseContext } from "../firebase/index";
import FileUploader from "react-firebase-file-uploader";
import useForm from "../components/hooks/useForm";
import Router from "next/router";
import { postValidate } from "../components/validation/validation";
import { Button, Error } from "../components/ui/components";

const upload = () => {
  const { auth, firebase } = useContext(FirebaseContext);
  const [imageErr, setImageErr] = useState(false);

  let initialState = {
    description: ""
  };

  //state requerido para la imagen
  const [nameImage, setNameImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");
  ////
  /* subida de la imagen se copio de la pagina*/

  const handleUploadStart = () => {
    setProgress(0);
    setLoading(true);
  };

  const handleProgress = progress => {
    setProgress({ progress });
  };

  const handleUploadError = error => {
    setLoading(error);
    console.log(error);
  };

  const handleUploadSuccess = filename => {
    setProgress(100);
    setLoading(false);
    setNameImage(filename);
    firebase.storage
      .ref("posts")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setUrlImage(url);
      });
  };
  ///
  const onSubmit = async () => {
    if (!auth) return Router.push("/login");
    const post = {
      userId: auth.uid,
      description,
      postImage: urlImage,
      created: Date.now(),
      likes: [],
      comments: []
    };
    await firebase.db.collection("posts").add(post);
    Router.push("/profile/[id]", `/profile/${auth.uid}`);
  };

  const { values, onHandleChange, onHandleSubmit, errors } = useForm(
    initialState,
    postValidate,
    onSubmit
  );
  const { description } = values;
  return (
    <Layout>
      <Header />

      <Form onSubmit={onHandleSubmit}>
        {errors.description && <Error>{errors.description}</Error>}
        <h3>Post Something</h3>
        {imageErr && <Error>Image is required</Error>}
        <div className="file-container">
          <FileUploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={firebase.storage.ref("posts")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </div>
        <textarea
          rows="4"
          name="description"
          onChange={onHandleChange}
          value={description}
        />

        <Button bgColor="true" disabled={!urlImage}>
          Post
        </Button>
      </Form>
    </Layout>
  );
};

const Form = styled.form`
  width: 95%;
  margin: 130px auto;
  max-width: 700px;
  display: flex;
  flex-flow: wrap column;
  h3 {
    flex: 1;
    font-size: 3.5rem;
    padding-bottom: 20px;
  }
  .file-container {
    margin: auto;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    border: 1px solid #ccc;
  }
  input[type="file"] {
    width: 200px;
  }
  textarea {
    margin: 30px auto;
    width: 500px;
  }
  button {
    width: 50%;
    margin: 0 auto;
  }
`;

export default upload;
