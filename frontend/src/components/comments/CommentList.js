import React from "react";

const CommentList = (props) => {
  return (
    <div className="lg:w-10/12 bg-cmnt rounded-3xl py-2 md:py-4 mt-8 mb-16 md:md-0">
      <div className="flex flex-col pl-4">
        <div>
          <h1 className="text-white font-lato text-lg font-bold">
            {props.name}
          </h1>
        </div>
        <div className="text-white font-lato">
          <p>{props.comment}</p>
        </div>
        <div className="text-detialColor font-lato flex justify-end pr-4 md:pr-8 ">
          {props.date.substring(0, 10)}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
