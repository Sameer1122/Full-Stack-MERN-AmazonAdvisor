import React, { useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AdContext from "../../store/ad-context";
import Listt from "./List";
const Adlist = () => {
  const adCtx = useContext(AdContext);
  console.log(
    adCtx.adData.map((data) => {
      return data.name;
    })
  );
  return (
    <div className="h-picDetails bg-bgAd rounded-3xl my-4 overflow-y-scroll">
      <div>
        <h1 className="text-white font-lato font-semibold text-center py-4 text-2xl">
          AD'S LIST
        </h1>
      </div>
      <div className="grid grid-cols-6 text-center p-4">
        <div className="text-white border border-borderColor font-bold py-2">
          <p className="text-xs sm:text-sm md:text-base">Image</p>
        </div>
        <div className="text-white font-lato border border-borderColor font-bold py-2">
          <h1 className="text-xs sm:text-sm md:text-base">Name</h1>
        </div>
        <div className="text-white font-lato border border-borderColor font-bold py-2">
          <p className="text-xs sm:text-sm md:text-base">Interval</p>
        </div>
        <div className="text-white font-lato border border-borderColor font-bold py-2">
          <p className="text-xs sm:text-sm md:text-base">From (yyyy-mm-dd)</p>
        </div>
        <div className="text-white font-lato border border-borderColor font-bold py-2">
          <p className="text-xs sm:text-sm md:text-base">To (yyyy-mm-dd)</p>
        </div>
        <div className="text-white font-lato border border-borderColor font-bold py-2 text-xs sm:text-sm md:text-base">
          Delete
        </div>
        {adCtx.adData.map((data) => {
          return (
            <Listt
              name={data.name}
              interval={data.interval}
              to={data.to}
              from={data.from}
              img={data.img}
              id={data._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Adlist;
