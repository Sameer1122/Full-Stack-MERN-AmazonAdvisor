import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import instance from "../api/axios";
const LoginComponent = (props) => {
  const [name, setName] = useState("");
  const [nameTouch, setnameTouch] = useState(false);
  const [password, setPassword] = useState("");
  const [commetTouch, setPasswordTouch] = useState(false);
  const [form, setForm] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const nameisValid = name.trim() !== "";
  const nameInputIsInvalid = !nameisValid && nameTouch;
  const passwordisValid = password.trim() !== "";
  const passwordInputIsInvalid = !passwordisValid && commetTouch;
  const history = useHistory();
  useEffect(() => {
    if (nameisValid && passwordisValid) {
      setForm(true);
    } else {
      setForm(false);
    }
    return () => {};
  }, [nameisValid, passwordisValid]);
  const nameChangeHandler = (event) => {
    setName(event.target.value);
    setError(false);
  };
  const nameBlurHandler = (event) => {
    setnameTouch(true);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const PasswordBlurHandler = (event) => {
    setPasswordTouch(true);
    setError(false);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setnameTouch(true);
    setPasswordTouch(true);
    const userInput = {
      userName: name,
      password: password,
    };
    setName("");
    setPassword("");
    setnameTouch(false);
    setPasswordTouch(false);
    try {
      setloading(true);
      const response = await instance.post("/user/login", userInput);
      const data = response.data;
      console.log(data);
      history.push("/admin");
      props.login(data.userId, data.token);
      setloading(false);
    } catch (error) {
      setError(true);
      setloading(false);
    }
  };

  return (
    <>
      <div className="grid place-content-center h-screen shadow-white">
        <div className="felx-col p-6 sm:p-24 bg-transparent items-center justify-center border border-borderColor rounded-3xl">
          <div className="font-bold text-center font-lato text-white text-5xl pb-8">
            Sign In
          </div>
          <div>
            <form
              onSubmit={submitHandler}
              action="
        "
              className="grid gap-y-4"
            >
              <div className="flex flex-col">
                <label htmlFor="" className="text-lg text-white font-lato mb-2">
                  Enter Username
                </label>
                <input
                  onBlur={nameBlurHandler}
                  onChange={nameChangeHandler}
                  type="text"
                  value={name}
                  className={`transition-color duration-300 bg-background mb-2 border text-white font-lato py-2 pr-16 pl-4 ${
                    nameInputIsInvalid ? "border-red-400" : "border-borderColor"
                  } rounded-2xl`}
                />
                {nameInputIsInvalid && (
                  <p className="text-red-400 font-lato text-sm">
                    Please Enter UserName
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor=""
                  className="text-lg text-white font-lato mb-2 "
                >
                  Enter Password
                </label>
                <input
                  onChange={passwordChangeHandler}
                  onBlur={PasswordBlurHandler}
                  type="password"
                  name="password"
                  value={password}
                  id=""
                  className={`transition-colors duration-300 ${
                    passwordInputIsInvalid
                      ? "border-red-400"
                      : "border-borderColor"
                  } bg-background border text-white py-2 pr-16 pl-4  font-lato rounded-2xl mb-2`}
                />
                {passwordInputIsInvalid && (
                  <p className="text-red-400 font-lato text-sm">
                    Please Enter Password
                  </p>
                )}
                {error && (
                  <p className="text-red-500 font-lato text-lg ml-2 mt-2">
                    Invalid Login Credentials
                  </p>
                )}
              </div>
              <button
                disabled={!form}
                type="submit"
                className="py-2 button-login px-6 font-lato text-white bg-transparent border border-borderColor rounded-3xl  transition duration-500 hover:bg-yellow-500"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
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

export default LoginComponent;
