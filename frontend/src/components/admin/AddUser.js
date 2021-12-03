import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import { modelAnimation, modeltransition } from "../../animation/animation";
import { motion } from "framer-motion";
const AddUser = (props) => {
  const [name, setname] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [add, setAdd] = useState(false);
  const [already, setAlready] = useState(false);
  const nameisValid = name.trim() !== "";
  const userNameisValid = userName.trim() !== "";
  const passwordisValid = password.trim().length >= 6;
  const [enterednameTouched, setEnterednameTouched] = useState(false);
  const [entereduserNameTouched, setEntereduserNameTouched] = useState(false);
  const [enteredpasswordTouched, setEnteredpasswordTouched] = useState(false);
  const [loading, setloading] = useState(false);
  useState(false);
  const nameInputValid = !nameisValid && enterednameTouched;
  const userNameInputValid = !userNameisValid && entereduserNameTouched;
  const passwordInputValid = !passwordisValid && enteredpasswordTouched;
  const [form, setForm] = useState(true);
  useEffect(() => {
    if (userNameisValid && passwordisValid && nameisValid) {
      setForm(true);
    } else {
      setForm(false);
    }
    return () => {};
  }, [userNameisValid, passwordisValid, nameisValid]);
  const nameInputBlurHandler = (event) => {
    setEnterednameTouched(true);
  };
  const userNameInputBlurHandler = () => {
    setEntereduserNameTouched(true);
  };
  const passwordInputBlurHandler = () => {
    setEnteredpasswordTouched(true);
  };
  const nameChangeHandler = (event) => {
    setAlready(false);
    setAdd(false);
    setname(event.target.value);
  };
  const userNameChngeHandler = (event) => {
    setuserName(event.target.value);
  };
  const passwordchangeHandler = (event) => {
    setpassword(event.target.value);
  };

  const onSubmitHandelr = async (event) => {
    event.preventDefault();
    const userInput = {
      name: name,
      userName: userName,
      password: password,
    };
    try {
      setloading(true);
      const response = await instance.post("/user/signup", userInput);
      const data = response.data;
      console.log(data);
      setAdd(true);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
      setAdd(false);
      setAlready(true);
    }
    setname("");
    setuserName("");
    setpassword("");
    setEnterednameTouched(false);
    setEntereduserNameTouched(false);
    setEnteredpasswordTouched(false);
  };
  const toggleEntry = (event) => {
    setToggle(!toggle);
    setname("");
    setuserName("");
    setpassword("");
    setEnterednameTouched(false);
    setEntereduserNameTouched(false);
    setEnteredpasswordTouched(false);
    setAdd(false);
    setAlready(false);
  };

  return (
    <>
      <div className="pb-16 flex flex-col">
        <div className="flex justify-center">
          <button
            onClick={toggleEntry}
            className={`py-4 px-6 text-white  font-semibold ${
              toggle ? "bg-red-500" : "bg-gray-900"
            } transition duration-150 ${
              toggle ? "hover:bg-red-800" : "hover:bg-green-800"
            } rounded-2xl`}
          >
            {toggle ? "Close" : "Add User"}
          </button>
        </div>
        {toggle && (
          <motion.div
            initial="in"
            animate="out"
            exit="exit"
            variants={modelAnimation}
            transition={modeltransition}
            className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover overflow-x-scroll"
            id="modal-id"
          >
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-bgAd border border-borderColor ">
              <div className="text-center text-white text-3xl font-lato py-4">
                <h1>Add User</h1>
              </div>

              <form
                action=""
                className="grid gap-y-6"
                onSubmit={onSubmitHandelr}
              >
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="" className="text-white font-lato">
                    Name
                  </label>
                  <br />
                  <input
                    type="text"
                    className={`bg-background border transition-colors duration-300 ${
                      !nameInputValid ? "border-borderColor" : "border-red-500"
                    } py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                    onChange={nameChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={name}
                    placeholder="Enter Name"
                  />
                  {nameInputValid && (
                    <p className="text-red-500 font-lato"> Please Enter name</p>
                  )}
                </div>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="userName" className="text-white font-lato">
                    UserName
                  </label>
                  <br />
                  <input
                    type="text"
                    className={`bg-background border  transition-colors duration-300 ${
                      !userNameInputValid
                        ? "border-borderColor"
                        : "border-red-500"
                    } py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                    onChange={userNameChngeHandler}
                    onBlur={userNameInputBlurHandler}
                    value={userName}
                    placeholder="Enter UserName"
                    errorText="Please enter a valid email address."
                  />
                  {userNameInputValid && (
                    <p className="text-red-500 font-lato">
                      {" "}
                      Please Enter userName
                    </p>
                  )}
                </div>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="password" className="text-white font-lato">
                    Password
                  </label>
                  <br />
                  <input
                    name="passord"
                    id=""
                    className={`bg-background border   transition-colors duration-300 ${
                      !passwordInputValid
                        ? "border-borderColor"
                        : "border-red-500"
                    } py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                    onBlur={passwordInputBlurHandler}
                    onChange={passwordchangeHandler}
                    placeholder="Enter Password"
                    value={password}
                    type={password}
                  />
                  {passwordInputValid && (
                    <p className="text-red-500 font-lato">
                      Please Enter password
                    </p>
                  )}
                  {add && (
                    <p className="text-green-500 font-lato text-lg ml-2 mt-2">
                      User Added Succefully!
                    </p>
                  )}
                  {already && (
                    <p className="text-red-500 font-lato text-lg ml-2 mt-2">
                      userName already exsit
                    </p>
                  )}
                </div>
                <div>
                  <div className="p-3  mt-2 text-center space-x-4 md:block">
                    <button
                      type="submit"
                      className="mb-2 md:mb-0 transition-colors duration-200 bg-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-borderColor border text-white rounded-full hover:shadow-lg hover:bg-green-800"
                      disabled={!form}
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setToggle(false);
                      }}
                      className="mb-2 md:mb-0 transition-colors duration-200 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-red-500  hover:text-white hover:border-borderColor"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
      {loading && (
        <div
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-5 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover overflow-x-scroll"
          id="modal-id"
        >
          <div class=" flex justify-center items-center">
            <div class="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
