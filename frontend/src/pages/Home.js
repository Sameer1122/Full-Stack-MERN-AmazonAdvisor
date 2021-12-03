import React from "react";
import Ads from "../components/Ads/Ads";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = (props) => {
  return (
    <div>
      <div className="my-5">
        <div
          className="border border-borderColor p-8 rounded-3xl"
          style={{ width: "97%", margin: "auto" }}
        >
          <Header token={props.token} />
          <Hero
            search={props.search}
            fetchData={props.fetchData}
            Profile={props.Profile}
            postData={props.postData}
            token={props.token}
          />
        </div>
        <Ads />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
