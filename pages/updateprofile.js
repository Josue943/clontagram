import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/layouts/layout";
import Header from "../components/layouts/header";
import styled from "@emotion/styled";
import { Input, Button, ErrorField } from "../components/ui/components";
import { FirebaseContext } from "../firebase";
import Router from "next/router";
import useForm from "../components/hooks/useForm";
import Spinner from "../components/ui/spinner";
import FileUploader from "react-firebase-file-uploader";
import { profileValidate } from "../components/validation/validation";

const updateprofile = () => {
  const { auth, firebase } = useContext(FirebaseContext);
  const [spinner, setSpinner] = useState(false);
  let profile = {
    description: "",
    fullName: ""
  };

  const onSubmit = () => {
    setSpinner(true);
    setTimeout(async () => {
      await firebase.db
        .collection("users")
        .doc(auth.uid)
        .update({ description, fullName, urlImage });
      Router.push("/profile/[id]", `/profile/${auth.uid}`);
    }, 3000);
  };

  ////image
  const [nameImage, setNameImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  ///

  const handleUploadStart = () => {
    setProgress(0);
    setLoading(true);
  };

  const handleProgress = progress => {
    setProgress({ progress });
  };

  const handleUploadError = error => {
    setLoading(error);
  };

  const handleUploadSuccess = filename => {
    setProgress(100);
    setLoading(false);
    setNameImage(filename);
    firebase.storage
      .ref("users")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setUrlImage(url);
      });
  };

  const { values, onHandleChange, onHandleSubmit, errors } = useForm(
    profile,
    profileValidate,
    onSubmit
  );
  const { fullName, description } = values;
  ////
  return (
    <Layout>
      <Header />
      <Form onSubmit={onHandleSubmit}>
        <h3>Update Profile</h3>
        <div className="form-control">
          <label>Profile Image</label>
          <FileUploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={firebase.storage.ref("users")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </div>
        <div className="form-control">
          <label>Full Name</label>
          <Input value={fullName} name="fullName" onChange={onHandleChange} />
        </div>
        {errors.fullName && <ErrorField>{errors.fullName}</ErrorField>}
        <div className="form-control">
          <label>Description</label>
          <textarea
            rows="3"
            value={description}
            name="description"
            onChange={onHandleChange}
          />
        </div>
        {errors.description && <ErrorField>{errors.description}</ErrorField>}

        <Button bgColor="true" disabled={!urlImage}>
          Send
        </Button>
      </Form>
      {spinner ? <Spinner /> : null}
    </Layout>
  );
};

const Form = styled.form`
  max-width: 500px;
  width: 95%;
  margin: 130px auto;
  h3 {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .form-control {
    display: flex;
    flex-flow: row wrap;
    margin: 15px 0;
    align-items: center;
    label {
      flex-basis: 120px;
    }
    input {
      flex: 1;
    }

    textarea {
      flex: 1;
    }
  }
`;

export default updateprofile;
