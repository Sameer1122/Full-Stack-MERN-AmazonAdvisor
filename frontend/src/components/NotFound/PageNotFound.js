import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
const PageNotFound = (props) => {
  return (
    <div>
      <div className="my-5">
        <div
          className="border border-borderColor p-8 rounded-3xl"
          style={{ width: "97%", margin: "auto" }}
        >
          <Header token={props.token} />
          <div className="flex flex-col items-center justify-center py-24">
            <h1 className="text-4xl font-bold font-serif text-navText text-center mb-8">
              {" "}
              Page Not Found!
            </h1>
            <Link to="/">
              <button className="py-2 px-4 rounded-3xl text-white bg-gray-600 transition duration-200 hover:bg-gray-800">
                Go To Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
