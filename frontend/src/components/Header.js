import React, { useState } from "react";
import Pic from "../assist/header.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import {
  transition,
  homeAnimation,
  faqAnimation,
  faqtransition,
  modelAnimation,
  modeltransition,
} from "../animation/animation";
const Header = (props) => {
  const location = useLocation();
  const [model, setmodel] = useState(false);
  console.log(props.token);
  return (
    <>
      <div>
        <nav className="flex justify-end pb-8">
          {props.token ? (
            <div
              className="text-navText font-lato font-semibold ml-4 transition duration-200 hover:text-blue-500 cursor-pointer p-4"
              onClick={() => {
                setmodel(true);
              }}
            >
              LOG OUT
            </div>
          ) : (
            <div className="text-navText font-lato font-semibold ml-4 transition duration-200 hover:text-blue-500 cursor-pointer">
              <Link to="/login"> LOG IN</Link>
            </div>
          )}
        </nav>
        <div className="md:w-11/12 mx-auto md:pb-12">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial="in"
              animate="out"
              exit="exit"
              variants={homeAnimation}
              transition={transition}
              className="flex flex-col"
            >
              <Link to="/">
                <div>
                  <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold font-lato tracking-wider text-center ">
                    AMAZON <br /> ADVISOR
                  </h1>
                </div>
                <div>
                  <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-lato leading-widest">
                    SELLER NEWS FEED
                  </h3>
                </div>
              </Link>
            </motion.div>
            <motion.div
              initial="in"
              animate="out"
              exit="exit"
              variants={faqAnimation}
              transition={faqtransition}
              className="md:w-7/12 md:mx-auto"
            >
              <img src={Pic} alt="" />
            </motion.div>
          </div>
        </div>
      </div>
      {/**Log Out Code */}
      {model && (
        <motion.div
          initial="in"
          animate="out"
          exit="exit"
          variants={modelAnimation}
          transition={modeltransition}
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-background border border-borderColor ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl text-white font-bold py-4 font-lato ">
                  Are you Sure you want to Logout?
                </h2>
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={props.logout}
                  className="mb-2 md:mb-0 bg-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full font-lato hover:shadow-lg hover:bg-red-800"
                >
                  Log Out
                </button>
                <button
                  onClick={() => {
                    setmodel(false);
                  }}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full font-lato hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
