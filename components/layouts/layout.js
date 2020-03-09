import React from "react";
import Head from "next/head";
import { Global, css } from "@emotion/core";

const layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.3;
            font-family: "Roboto";
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          span {
            /*  padding-top: 14px;
            padding-bottom: 14px; */
            /*  border-bottom: 1px solid #ccc;
            border-top: 1px solid #ccc; */
            /*  display: block; */
            a {
              color: blue;
              cursor: pointer;
              text-decoration: none;
            }
          }
          .title-logo {
            font-family: "Cedarville Cursive";
            font-size: 4.5rem;
            text-align: center;
          }
          ul {
            list-style: none;
          }
          h3 {
            font-family: "PT sans";
            font-size: 3rem;
            text-align: center;
          }
          a {
            text-decoration: none;
            color: black;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `}
      />

      <Head>
        <title>Clontagram</title>
        <link rel="icon" href="/instagram.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Cedarville+Cursive|Roboto:400,700&display=swap"
          rel="stylesheet"
        />
        <link href="/static/css/app.css" rel="stylesheet" />
      </Head>

      <main>{children}</main>
      <script
        src="https://kit.fontawesome.com/ced9903c03.js"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default layout;
