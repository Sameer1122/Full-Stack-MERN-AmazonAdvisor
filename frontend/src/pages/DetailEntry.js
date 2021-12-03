import React from "react";
import { useParams } from "react-router";
import Ads from "../components/Ads/Ads";
import Details from "../components/detailPage/Details";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Left from "../components/left";

const DetailEntry = (props) => {
  const param = useParams();
  console.log(param.entryId);
  const data = props.postData;
  const paramsId = +param.entryId;
  const detialEntry = [
    data.find((entry) => {
      return entry.pid === paramsId;
    }),
  ];

  console.log(detialEntry);
  return (
    <>
      <div className="my-10">
        <div
          className="border border-borderColor p-8 rounded-3xl"
          style={{ width: "97%", margin: "auto" }}
        >
          <Header token={props.token} />
          <div className="flex flex-col-reverse lg:flex-row justify-between md:w-11/12 mx-auto h-full">
            <Left Profile={props.Profile} />

            {detialEntry.length >= 1 &&
              detialEntry?.map((data) => {
                return (
                  <Details
                    entry={data}
                    fetchData={props.fetchData}
                    token={props.token}
                    addComment={props.addComment}
                    commentData={props.commentData}
                    token={props.token}
                  />
                );
              })}
          </div>
          <Ads />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailEntry;
