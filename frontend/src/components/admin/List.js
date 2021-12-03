import React, { useState, useContext } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import instance from "../../api/axios";
import AdContext from "../../store/ad-context";
const Listt = (props) => {
  const adCtx = useContext(AdContext);
  const [model, setModel] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const deleteItem = async (e) => {
    try {
      const response = await instance.delete(`/ads/${props.id}`);
      const data = response.data;
      console.log(data);
      setModel(false);
      setDeleted(true);
      adCtx.getAdData();
    } catch (error) {
      window.alert("something went wrong");
    }
  };
  console.log(props.id);
  return (
    <>
      <div className="text-white border border-borderColor py-2">
        <img src={`http://localhost:5000/${props.img}`} alt="" className="" />
      </div>
      <div className="text-white font-lato border border-borderColor flex justify-center items-center p-2">
        <h1 className="text-xs sm:text-sm md:text-base">{props.name}</h1>
      </div>
      <div className="text-white font-lato border border-borderColor flex justify-center items-center p-2">
        <p className="text-xs sm:text-sm md:text-base">
          {props.interval / 1000}s
        </p>
      </div>
      <div className="text-white font-lato border border-borderColor flex justify-center items-center p-2">
        <p className="text-xs sm:text-sm md:text-base">
          {" "}
          {props.from.substring(0, 10)}
        </p>
      </div>
      <div className="text-white font-lato border border-borderColor flex justify-center items-center p-2">
        <p className="text-xs sm:text-sm md:text-base">
          {props.to.substring(0, 10)}
        </p>
      </div>
      <div className="text-red-500 font-lato border border-borderColor font-bold flex items-center justify-center p-2">
        <AiFillDelete
          onClick={(event) => {
            setModel(true);
          }}
          className="w-8 h-8 cursor-pointer transition duration-300 transform hover:text-red-800 hover:-translate-y-2 hover:scale-105"
        />
      </div>

      {model && (
        <div
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg  relative mx-auto my-auto rounded-xl shadow-lg  bg-background border-2 border-borderColor ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-red-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h2 className="text-xl text-white font-bold py-4 ">
                  Are you sure?
                </h2>
                <p className="text-sm text-white px-8">
                  Do you really want to delete this Ad? This process cannot be
                  undone!
                </p>
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={deleteItem}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModel(false);
                  }}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleted && (
        <div
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-background  ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl text-white font-bold py-4 ">
                  Ad Deleted Successfully!
                </h2>
              </div>
              <button
                onClick={() => {
                  setDeleted(false);
                }}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Listt;
