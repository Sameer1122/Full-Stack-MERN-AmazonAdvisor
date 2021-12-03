import React, { useEffect, useState, useContext } from "react";
import instance from "../../api/axios";
import AdContext from "../../store/ad-context";

const AdCreate = () => {
  const adCtx = useContext(AdContext);
  const [name, setname] = useState("");
  const [interval, setInterval] = useState();
  const [fromDate, setFromDate] = useState();
  const [todate, settoDate] = useState();
  const [img, setimg] = useState();
  const [toggle, setToggle] = useState(false);
  const [model, setmodel] = useState(false);
  const nameisValid = name.trim() !== "";
  const intervalisValid = interval >= 1000;
  const [imageisValid, setimageisValid] = useState(false);
  const [toDateValid, settoDateValid] = useState(false);
  const [loading, setloading] = useState(false);
  const [fromDateValid, setfromDateValid] = useState(false);
  const [enterednameTouched, setEnterednameTouched] = useState(false);
  const nameInputValid = !nameisValid && enterednameTouched;
  const [form, setForm] = useState(true);
  useEffect(() => {
    if (
      nameisValid &&
      intervalisValid &&
      imageisValid &&
      toDateValid &&
      fromDateValid
    ) {
      setForm(true);
    } else {
      setForm(false);
    }
    return () => {};
  }, [nameisValid, intervalisValid, imageisValid]);
  const nameInputBlurHandler = (event) => {
    setEnterednameTouched(true);
  };
  const nameChangeHandler = (event) => {
    setname(event.target.value);
  };
  const imageChngeHandler = (event) => {
    let img2 = event.target.files[0];
    setimageisValid(true);
    setimg(img2);
    console.log(img);
  };

  const onSubmitHandelr = async (event) => {
    event.preventDefault();
    const userInput = {
      name: name,
      img: img,
      interval: interval,
      from: new Date(fromDate),
      to: new Date(todate),
      pid: Math.random(),
    };
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("pid", Math.random());
      formdata.append("name", name);
      formdata.append("img", img);
      formdata.append("interval", interval);
      formdata.append("from", new Date(fromDate).toISOString());
      formdata.append("to", new Date(todate).toISOString());
      const response = await instance.post("/ads", formdata);
      const data = response.data;
      console.log(data);
      setToggle(false);
      adCtx.getAdData();
      setmodel(true);
      setloading(false);
    } catch (error) {
      window.alert("Can't Get Added");
      setloading(false);
    }
  };

  return (
    <>
      <div className="pb-16 flex flex-col">
        <div className="flex justify-center">
          <button
            onClick={() => {
              setToggle(true);
            }}
            className={`py-4 px-6 text-white  font-semibold ${
              toggle ? "bg-red-500" : "bg-black"
            } transition duration-150 ${
              toggle ? "hover:bg-red-800" : "hover:bg-green-800"
            } rounded-2xl`}
          >
            {toggle ? "Close" : "Create Add"}
          </button>
        </div>
        {toggle && (
          <div
            className="overflow-y-scroll min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover overflow-x-scroll"
            id="modal-id"
          >
            <div className="absolute opacity-80 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-bgAd border border-borderColor ">
              <div className="text-center text-white text-3xl font-lato">
                <h1>Create an Ad</h1>
              </div>
              <form className="grid gap-y-4" onSubmit={onSubmitHandelr}>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="" className="text-white font-lato">
                    Name of the Ad
                  </label>
                  <br />
                  <input
                    type="text"
                    className={`bg-background border ${
                      !nameInputValid ? "border-borderColor" : "border-red-500"
                    } py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                    onChange={nameChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={name}
                    placeholder="Enter Title"
                  />
                  {nameInputValid && (
                    <p className="text-red-500 font-lato">
                      {" "}
                      Please Enter Ad Name
                    </p>
                  )}
                </div>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="" className="text-white font-lato">
                    Ad Interval
                  </label>
                  <br />
                  <input
                    type="number"
                    min="1000"
                    step="10"
                    className={`bg-background border border-borderColor py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                    onChange={(event) => {
                      setInterval(event.target.value);
                    }}
                    onBlur={nameInputBlurHandler}
                    value={interval}
                    placeholder="1000 = 1sec"
                  />
                </div>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="" className="text-white font-lato">
                    From
                  </label>
                  <br />
                  <input
                    type="date"
                    min="1000"
                    className={`bg-background border border-borderColor py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                    onChange={(event) => {
                      setfromDateValid(true);
                      setFromDate(event.target.value);
                    }}
                    value={fromDate}
                    placeholder="1000 = 1sec"
                    required
                  />
                </div>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="" className="text-white font-lato">
                    To
                  </label>
                  <br />
                  <input
                    type="date"
                    min="1000"
                    className={`bg-background border border-borderColor py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                    onChange={(event) => {
                      settoDateValid(true);
                      settoDate(event.target.value);
                    }}
                    value={todate}
                    placeholder="1000 = 1sec"
                  />
                </div>
                <div className="text-center  flex-auto justify-center">
                  <label htmlFor="Image" className="text-white font-lato">
                    Image
                  </label>
                  <br />
                  <input
                    required
                    className="text-white"
                    type="file"
                    placeholder="Enter Img Url"
                    onChange={imageChngeHandler}
                  />
                </div>
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    type="submit"
                    disabled={!form}
                    className="mb-2 md:mb-0 transition-colors duration-200 bg-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-borderColor border text-white rounded-full hover:shadow-lg hover:bg-green-800"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setname("");
                      setimg();
                      setInterval();
                      setFromDate();
                      settoDate();
                      setToggle(false);
                    }}
                    className="mb-2 md:mb-0 transition-colors duration-200 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-red-500  hover:text-white hover:border-borderColor"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {model && (
        <div
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-bgAd ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl text-white font-bold py-4 ">
                  Ad Created Successfully!
                </h2>
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => {
                    setmodel(false);
                  }}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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

export default AdCreate;
