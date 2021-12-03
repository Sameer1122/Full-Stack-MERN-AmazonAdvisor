import React, { useState, useEffect } from "react";
import instance from "../../api/axios";
const ProfileForm = (props) => {
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [img, setimg] = useState();
  const [description, setDescription] = useState("");
  const nameisValid = name.trim() !== "";
  const [imageisValid, setimageisValid] = useState(false);
  console.log(imageisValid);
  const descriptionisValid = description.trim() !== "";
  const [loading, setloading] = useState(false);
  const [enterednameTouched, setEnterednameTouched] = useState(false);
  const [enteredimageTouched, setEnteredimageTouched] = useState(false);
  const [entereddescriptionTouched, setEntereddescriptionTouched] =
    useState(false);

  const titleInputValid = !nameisValid && enterednameTouched;
  const imageInputValid = !imageisValid && enteredimageTouched;
  const descriptionInputValid =
    !descriptionisValid && entereddescriptionTouched;
  const [form, setForm] = useState(true);
  const [model, setmodel] = useState(false);
  useEffect(() => {
    if (imageisValid && descriptionisValid && nameisValid) {
      setForm(true);
    } else {
      setForm(false);
    }
    return () => {};
  }, [imageisValid, descriptionisValid, nameisValid]);
  const profileEditHandler = () => {
    setToggle(!toggle);
    setName("");
    setimageisValid(false);
    setDescription("");
    setEnterednameTouched(false);
    setEnteredimageTouched(false);
    setEntereddescriptionTouched(false);
  };
  const nameInputBlurHandler = (event) => {
    setEnterednameTouched(true);
  };
  const imageInputBlurHandler = () => {
    setEnteredimageTouched(true);
  };
  const descriptionInputBlurHandler = () => {
    setEntereddescriptionTouched(true);
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const imgHandler = (event) => {
    let img2 = event.target.files[0];
    setimageisValid(true);
    console.log(img2);
    setimg(img2);
    console.log(img);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const onSubmitHandelr = async (event) => {
    event.preventDefault();

    const profileInput = {
      name: name,
      description: description,

      image: img,
    };
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("image", img);
      const response = await instance.patch(
        "/profile/61702cffc116feeeac8cdb8b",
        formdata
      );
      const data = response.data;
      console.log(data);
      props.fetchData();
      setmodel(true);
      setloading(false);
      setToggle(false);
    } catch (error) {
      setloading(false);
      window.alert("cant get Added");
    }

    setName("");
    setDescription("");
    setimageisValid(false);
    setEnterednameTouched(false);
    setEnteredimageTouched(false);
    setEntereddescriptionTouched(false);
  };
  return (
    <>
      <div className=" flex-col   flex justify-center">
        <div className="flex justify-center">
          <button
            className={`py-4 px-6 text-white  font-semibold ${
              toggle ? "bg-red-500" : "bg-indigo-600"
            } transition duration-150 ${
              toggle ? "hover:bg-red-800" : "hover:bg-indigo-800"
            } rounded-2xl`}
            onClick={profileEditHandler}
          >
            {toggle ? "Close" : "Edit Profile"}
          </button>
        </div>
        {toggle && (
          <div
            className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover overflow-x-scroll"
            id="modal-id"
          >
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-bgAd border border-borderColor ">
              <div className="text-center text-white text-3xl font-lato py-4">
                <h1>Edit Profile</h1>
              </div>
              <form
                action=""
                className="grid gap-y-6"
                onSubmit={onSubmitHandelr}
              >
                <div>
                  <label htmlFor="" className="text-white font-lato ml-4">
                    Name
                  </label>
                  <br />
                  <input
                    type="text"
                    className={`bg-background border transition-colors duration-300  ${
                      !titleInputValid ? "border-borderColor" : "border-red-500"
                    } py-2 px-8 rounded-3xl text-white font-lato`}
                    placeholder="Enter Name"
                    onChange={nameHandler}
                    onBlur={nameInputBlurHandler}
                    value={name}
                  />
                  {titleInputValid && (
                    <p className="text-red-400 font-lato text-xs ml-2 mt-2">
                      {" "}
                      Please Enter Name{" "}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="Image" className="text-white font-lato">
                    Image
                  </label>
                  <br />
                  <input
                    required
                    className="bg-background text-white"
                    type="file"
                    placeholder="Enter Img Url"
                    onChange={imgHandler}
                  />
                  {imageInputValid && (
                    <p className="text-red-400 font-lato text-xs ml-2 mt-2">
                      Please Enter img Url
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Description"
                    className="text-white font-lato "
                  >
                    Description
                  </label>
                  <br />
                  <textarea
                    name="Descripton"
                    id=""
                    cols="30"
                    rows="5"
                    onBlur={descriptionInputBlurHandler}
                    value={description}
                    onChange={descriptionHandler}
                    placeholder="Enter Description"
                    className={`bg-background border  ${
                      !descriptionInputValid
                        ? "border-borderColor transition-colors duration-300"
                        : "border-red-400"
                    } py-2 px-8 rounded-3xl text-white font-lato`}
                  ></textarea>
                  {descriptionInputValid && (
                    <p className="text-red-400 font-lato text-xs ml-2 mt-2">
                      Please Enter Desription
                    </p>
                  )}
                </div>
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    type="submit"
                    className="mb-2 md:mb-0 transition-colors font-lato duration-200 bg-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-borderColor border text-white rounded-full hover:shadow-lg hover:bg-green-800"
                    disabled={!form}
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setToggle(false);
                    }}
                    className="mb-2 md:mb-0 font-lato transition-colors duration-200 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-red-500  hover:text-white hover:border-borderColor"
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
                  Profile Added Successfully!
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

export default ProfileForm;
