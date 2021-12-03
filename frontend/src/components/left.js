import React from "react";
import Book from "../assist/book.png";
const Left = (props) => {
  return (
    <div className="lg:w-4/12 xl:w-3/12 border border-solid border-borderColor rounded-3xl mb-32 md:mb-0">
      <div className="text-white font-semibold font-lato text-lg w-10/12 mx-auto pt-8">
        <h1 className="p-4">EDITOR</h1>
      </div>
      <div className="flex flex-col p-4 py-12 w-picCont mx-auto">
        <div className="w-8/12 sm:w-1/2 lg:w-full grid grid-cols-5 grid-rows-3 pb-16">
          <img
            src={`http://localhost:5000/${props.Profile.image}`}
            alt=""
            className="h-32 w-32 sm:h-pic sm:w-pic rounded-full object-cover border-4 border-white row-span-full col-span-full left-image"
          />
          <img
            src={Book}
            className="row-span-full w-28 sm:w-auto pl-8 col-span-full  pt-24  sm:pl-6 lg:pl-8 2xl:pl-0 lg:pt-24 sm:pt-20"
            alt=""
            style={{ gridColumn: "3/-1" }}
          />
        </div>
        <div className="text-white font-lato pb-8 ">
          <p>{props.Profile.description}</p>
        </div>
        <div className="">
          <div className="w-2/12 border-t border-borderColor"></div>
          <h1 className="text-navText  pt-8  font-lato text-base">
            {props.Profile.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Left;
