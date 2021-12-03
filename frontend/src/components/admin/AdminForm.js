import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import ChipInput from "material-ui-chip-input";
const AdminForm = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [sideBar, setSideBar] = useState("");
  const [toggle, setToggle] = useState(false);
  const [tags, setTags] = useState([]);
  const titleisValid = title.trim() !== "";
  const [imageisValid, setimageisValid] = useState(false);
  const descriptionisValid = description.trim() !== "";
  const [enteredtitleTouched, setEnteredtitleTouched] = useState(false);
  const [enteredimageTouched, setEnteredimageTouched] = useState(false);
  const [loading, setloading] = useState(false);
  const [entereddescriptionTouched, setEntereddescriptionTouched] =
    useState(false);

  const titleInputValid = !titleisValid && enteredtitleTouched;
  const imageInputValid = !imageisValid && enteredimageTouched;
  const descriptionInputValid =
    !descriptionisValid && entereddescriptionTouched;
  const [form, setForm] = useState(true);
  const [model, setmodel] = useState(false);
  useEffect(() => {
    if (imageisValid && descriptionisValid && titleisValid) {
      setForm(true);
    } else {
      setForm(false);
    }
    return () => {};
  }, [imageisValid, descriptionisValid, titleisValid]);
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
    console.log(img2);
    setImage(img2);
  };
  const discCHangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const sideBarHandler = (event) => {
    setSideBar(event.target.value);
    console.log(sideBar);
  };
  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
    console.log(tags);
  };
  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));
  const onSubmitHandelr = async (event) => {
    event.preventDefault();
    const userInput = {
      pid: Math.random(),
      title: title,
      img: image,
      description: description,
      sideBar: sideBar,
      views: 0,
    };
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("pid", Math.random());
      formdata.append("title", title);
      formdata.append("img", image);
      formdata.append("description", description);
      formdata.append("sideBar", sideBar);
      formdata.append("views", 0);
      formdata.append("tags", tags);
      console.log(formdata);
      const response = await instance.post("/stories", formdata);
      const data = response.data;
      console.log(data);
      props.fetchData();
      setToggle(false);
      setmodel(true);
      setloading(false);
    } catch (error) {
      window.alert("Can't Get Added");
      setloading(false);
    }
    setTitle("");
    setImage();
    setimageisValid(false);
    setDescription("");
    setEnteredtitleTouched(false);
    setEnteredimageTouched(false);
    setTags([]);
    setEntereddescriptionTouched(false);
  };
  const toggleEntry = (event) => {
    setToggle(!toggle);
    setTitle("");
    setImage();
    setimageisValid(false);
    setDescription("");
    setTags([]);
    setEnteredtitleTouched(false);
    setEnteredimageTouched(false);
    setEntereddescriptionTouched(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <button
            onClick={toggleEntry}
            className={`py-4 px-6 text-white  font-semibold ${
              toggle ? "bg-red-500" : "bg-green-600"
            } transition duration-150 ${
              toggle ? "hover:bg-red-800" : "hover:bg-green-800"
            } rounded-2xl`}
          >
            {toggle ? "Close" : "Add Entry"}
          </button>
        </div>
        {toggle && (
          <div
            className="min-w-screen h-screen animated fadeIn faster bg-transparent  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover overflow-x-scroll"
            id="modal-id"
          >
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-bgAd border border-borderColor ">
              <div className="text-center text-white text-3xl font-lato py-4">
                <h1>Add a Story</h1>
              </div>
              <form
                action=""
                className="grid gap-y-6 "
                onSubmit={onSubmitHandelr}
              >
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
                    <p className="text-red-500 font-lato">
                      {" "}
                      Please Enter Title
                    </p>
                  )}
                </div>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="Image" className="text-white font-lato">
                    Image
                  </label>
                  <br />
                  <input
                    required
                    className="bg-background text-white"
                    type="file"
                    placeholder="Enter Img Url"
                    onChange={imageChngeHandler}
                  />
                  {imageInputValid && (
                    <p className="text-red-500 font-lato">
                      {" "}
                      Please Enter Image
                    </p>
                  )}
                </div>
                <div className="text-center flex-auto justify-center">
                  <label htmlFor="color" className="text-white font-lato">
                    SideBar Color
                  </label>
                  <br />
                  <input type="color" onChange={sideBarHandler} />
                </div>
                <div className="text-center flex-auto justify-center">
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
                <div className="text-center flex-auto justify-center">
                  <ChipInput
                    style={{
                      border: "1px solid #4c4d50",
                      backgroundColor: "white",
                      borderRadius: "16px",
                    }}
                    name="tags"
                    variant="outlined"
                    label="Enter Tags "
                    fullWidth
                    value={tags}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip) => handleDeleteChip(chip)}
                  />
                </div>
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    type="submit"
                    className="mb-2 md:mb-0 font-lato transition-colors duration-200 bg-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-borderColor border text-white rounded-full hover:shadow-lg hover:bg-green-800"
                    disabled={!form}
                  >
                    Submit
                  </button>{" "}
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
                <h2 className="text-xl text-white font-bold py-4 font-lato ">
                  Story Added Successfully!
                </h2>
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => {
                    setmodel(false);
                  }}
                  className="mb-2 md:mb-0 bg-white font-lato px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
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

export default AdminForm;
