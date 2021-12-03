import React from "react";
import PageNotFound from "../components/NotFound/PageNotFound";

const NotFound = (props) => {
  return (
    <>
      <PageNotFound token={props.token} />
    </>
  );
};

export default NotFound;
