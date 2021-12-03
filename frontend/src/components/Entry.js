import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import instance from "../api/axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Entry = (props) => {
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [img, setimg] = useState();
  const [description, setDescription] = useState("");
  const [sideBar, setSideBar] = useState("");
  const [modeledit, setmodeledit] = useState(false);
  const titleisValid = title.trim() !== "";
  const [imageisValid, setimageisValid] = useState(false);
  const descriptionisValid = description.trim() !== "";
  const [enteredtitleTouched, setEnteredtitleTouched] = useState(false);
  const [enteredimageTouched, setEnteredimageTouched] = useState(false);
  const [entereddescriptionTouched, setEntereddescriptionTouched] =
    useState(false);
  const titleInputValid = !titleisValid && enteredtitleTouched;
  const imageInputValid = !imageisValid && enteredimageTouched;
  const descriptionInputValid =
    !descriptionisValid && entereddescriptionTouched;
  const [form, setForm] = useState(true);

  useEffect(() => {
    if (imageisValid && descriptionisValid && titleisValid) {
      setForm(true);
    } else {
      setForm(false);
    }
    return () => {};
  }, [imageisValid, descriptionisValid, titleisValid]);

  const history = useHistory();
  const [del, setDel] = useState(false);
  const [model, setmodel] = useState(false);
  const [editModel, seteditModel] = useState(false);
  const [edit, setEdit] = useState(false);

  const nameInputBlurHandler = (event) => {
    setEnteredtitleTouched(true);
  };
  const imageInputBlurHandler = () => {
    setEnteredimageTouched(true);
  };
  const descriptionInputBlurHandler = () => {
    setEntereddescriptionTouched(true);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const imageChngeHandler = (event) => {
    let img2 = event.target.files[0];
    setimageisValid(true);
    setimg(img2);
    console.log(img);
  };
  const discCHangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const sideBarHandler = (event) => {
    setSideBar(event.target.value);
    console.log(sideBar);
  };

  const onSubmitHandelr = async (event) => {
    event.preventDefault();
    const userInput = {
      title: title,
      img: image,
      description: description,
      sideBar: sideBar,
    };
    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("img", img);
      formdata.append("description", description);
      formdata.append("sideBar", sideBar);
      const response = await instance.patch(`/stories/${props.id}`, formdata);
      const data = response.data;
      console.log(data);
      seteditModel(false);
      setmodeledit(true);
      props.fetchData();
    } catch (error) {
      window.alert("Can't Get Added");
    }
    setTitle("");
    setImage();
    setimageisValid(false);
    setDescription("");
    setEnteredtitleTouched(false);
    setEnteredimageTouched(false);
    setEntereddescriptionTouched(false);
  };

  // const month = props.date;
  // const day = props.date;
  // const year = props.date;
  const deleteItem = async () => {
    console.log(props.id);
    try {
      const response = await instance.delete(`/stories/${props.id}`);
      const data = response.data;
      console.log(data);
      setDel(false);
      setmodel(true);
      props.fetchData();
    } catch (error) {
      window.alert("something went wrong");
    }
  };
  const updateView = async () => {
    const userInput = {
      views: props.views,
    };
    try {
      const response = await instance.patch(
        `/stories/update/${props.id}`,
        userInput
      );
      const data = response.data;
      console.log(data);

      props.fetchData();
    } catch (error) {
      window.alert("something went wrong");
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <Link
          to={
            props.token ? `/adminEntry${props.pid}` : `/entry/Entry${props.pid}`
          }
          onClick={updateView}
        >
          <div className="w-full">
            <img
              src={`http://localhost:5000/${props.img}`}
              alt=""
              className="rounded-3xl transition transform duration-500 hover:-translate-y-1 object-cover md:h-picDetail"
              style={{ width: "100%" }}
            />
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <div
            className={"border-l-8 pl-4 pb-4 mb-8 "}
            style={{ borderColor: props.sideBar }}
          >
            <h3 className="text-white font-lato">{props.title}</h3>
          </div>
          {props.token && (
            <div className="flex items center justify-between">
              <AiFillEdit
                onClick={() => {
                  seteditModel(true);
                }}
                className="h-6 w-6 text-green-600 mr-4 transition transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
              />
              <AiFillDelete
                className="h-6 w-6 text-red-600 transition transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
                onClick={() => {
                  setDel(true);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div>
            <h4 className="text-detialColor font-lato">
              {props.date.substring(0, 10)}
            </h4>
          </div>
          <div className="text-detialColor font-lato flex items-center">
            <BsEyeFill className="text-navColor text-white mr-2" />
            <h5>{props.views} reads</h5>
          </div>
        </div>
      </div>
      {del && (
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
                  Do you really want to delete your Post? This process cannot be
                  undone
                </p>
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => {
                    setDel(false);
                  }}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteItem}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {model && (
        <div
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-background  ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl text-white font-bold py-4 ">
                  Profile Deleted Successfully!
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
      {editModel && (
        <div
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover overflow-x-scroll"
          id="modal-id"
        >
          <div className="absolute opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-background border border-borderColor ">
            <div className="text-center text-white text-3xl font-lato">
              <h1>Edit Story</h1>
            </div>
            <form className="grid gap-y-4" onSubmit={onSubmitHandelr}>
              <div className="text-center flex-auto justify-center">
                <label htmlFor="" className="text-white font-lato">
                  Title
                </label>
                <br />
                <input
                  type="text"
                  className={`bg-background border ${
                    !titleInputValid ? "border-borderColor" : "border-red-500"
                  } py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                  onChange={titleChangeHandler}
                  onBlur={nameInputBlurHandler}
                  value={title}
                  placeholder="Enter Title"
                />
                {titleInputValid && (
                  <p className="text-red-500 font-lato"> Please Enter Title</p>
                )}
              </div>
              <div className="text-center  flex-auto justify-center">
                <label htmlFor="Image" className="text-white font-lato">
                  Image
                </label>
                <br />
                <input
                  className="bg-background text-white"
                  type="file"
                  placeholder="Enter Img Url"
                  onChange={imageChngeHandler}
                />
                {imageInputValid && (
                  <p className="text-red-500 font-lato"> Please Enter Image</p>
                )}
              </div>
              <div className="text-center  flex-auto justify-center">
                <label htmlFor="color" className="text-white font-lato">
                  SideBar Color
                </label>
                <br />
                <input type="color" onChange={sideBarHandler} />
              </div>
              <div className="text-center  flex-auto justify-center">
                <label htmlFor="Description" className="text-white font-lato">
                  Description
                </label>
                <br />
                <textarea
                  name="Descripton"
                  id=""
                  className={`bg-background border ${
                    !descriptionInputValid
                      ? "border-borderColor"
                      : "border-red-500"
                  } py-2 px-8 rounded-3xl text-white font-lato mb-2`}
                  cols="20"
                  rows="5"
                  onBlur={descriptionInputBlurHandler}
                  onChange={discCHangeHandler}
                  placeholder="Enter Description"
                  value={description}
                ></textarea>
                {descriptionInputValid && (
                  <p className="text-red-500 font-lato">
                    Please Enter Description
                  </p>
                )}
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
                    seteditModel(false);
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
      {modeledit && (
        <div
          className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-borderColor  ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl text-white font-bold py-4 ">
                  Story Updated successfully!
                </h2>
              </div>
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => {
                    setmodeledit(false);
                  }}
                  className="mb-2 md:mb-0 transition-colors duration-200 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-red-500  hover:text-white hover:border-borderColor"
                >
                  Ok!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Entry;
