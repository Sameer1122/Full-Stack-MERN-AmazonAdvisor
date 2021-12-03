import React from "react";
import Left from "./left";
import Right from "./Right";

const Hero = (props) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between lg:w-11/12 mx-auto h-full">
      <Left Profile={props.Profile} />
      <Right
        search={props.search}
        postData={props.postData}
        token={props.token}
        fetchData={props.fetchData}
      />
    </div>
  );
};

export default Hero;
