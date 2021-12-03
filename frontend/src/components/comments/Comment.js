import React, { useState, useEffect } from "react";
import instance from "../../api/axios";
import { FaRegComments } from "react-icons/fa";
import { AiFillPlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import CommentList from "./CommentList";
import { useParams } from "react-router";
const Comment = (props) => {
  const params = useParams();
  const [name, setName] = useState("");
  const [nameTouch, setnameTouch] = useState(false);
  const [comment, setComment] = useState("");
  const [commetTouch, setcommentTouch] = useState(false);
  const [form, setForm] = useState(true);
  const nameisValid = name.trim() !== "";
  const [loading, setLoading] = useState(false);
  const nameInputIsInvalid = !nameisValid && nameTouch;
  const commentisValid = comment.trim() !== "";
  const commentInputIsInvalid = !commentisValid && commetTouch;
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (nameisValid && commentisValid) {
      setForm(true);
    } else {
      setForm(false);
    }
    return () => {};
  }, [nameisValid, commentisValid]);
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const nameBlurHandler = (event) => {
    setnameTouch(true);
  };
  const commentBlurHandler = (event) => {
    setcommentTouch(true);
  };
  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const addCommentHandler = () => {
    setToggle(!toggle);
    setName("");
    setComment("");
    setnameTouch(false);
    setcommentTouch(false);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setnameTouch(true);
    setcommentTouch(true);
    const userInput = {
      user: name,
      message: comment,
      commentId: +params.entryId,
    };
    try {
      setLoading(true);
      const response = await instance.post("/comments", userInput);
      const data = response.data;
      console.log(data);
      props.fetchData();
      setLoading(false);
    } catch (error) {
      window.alert("Can't Get Added");
      setLoading(false);
    }
    setName("");
    setComment("");
    setnameTouch(false);
    setcommentTouch(false);
    setToggle(false);
  };
  const data = props.commentData;
  const paramsId = +params.entryId;
  const commentList = data.filter((entry) => {
    return entry.commentId === paramsId;
  });
  // console.log(paramsId);
  // console.log(commentList);
  // console.log(props.commentData);
  const token = !props.token;
  console.log(token);
  return (
    <>
      {token && (
        <div className="mt-12 lg:w-10/12 ">
          <div className="flex justify-between pb-12">
            <div className="flex items-center ">
              <FaRegComments className="h-6 w-6 text-white mr-4 md:mr-8" />
              <p className="text-white text-lg font-sans font-bold">Comments</p>
            </div>
            <div
              className="group flex items-center cursor-pointer"
              onClick={addCommentHandler}
            >
              <div>
                {toggle ? (
                  <AiOutlineCloseCircle className="text-iconColor transition duration-200 group-hover:text-red-600" />
                ) : (
                  <AiFillPlusCircle
                    className={`text-iconColor transition duration-200 group-hover:text-green-600`}
                  />
                )}
              </div>
              <div>
                <p
                  className={`text-white ml-2 transition duration-200 ${
                    toggle
                      ? "group-hover:text-red-600"
                      : "group-hover:text-green-600"
                  }`}
                >
                  {toggle ? "Close" : "Add a comment"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {toggle && (
        <div className="md:w-8/12  lg:w-10/12 mt-4">
          <div className="2xl:w-4/5 xl:mx-auto border border-borderColor lg:p-8 rounded-3xl">
            <form
              action=""
              className="grid gap-12 py-4 px-4 md:gap-y-6"
              onSubmit={submitHandler}
            >
              <div className=" grid gap-2 md:flex md:items-center md:justify-between">
                <label htmlFor="" className="text-white">
                  Name:
                </label>
                <div className="flex flex-col">
                  <input
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    type="text"
                    placeholder="Enter Name"
                    className={`bg-background py-2 px-6 border transition-colors duration-300 ${
                      !nameInputIsInvalid
                        ? "border-borderColor"
                        : "border-red-400"
                    } rounded-3xl text-white mb-2`}
                  />
                  {nameInputIsInvalid && (
                    <p className="text-red-400 font-lato text-sm transition-opacity duration-300">
                      Please Enter Name
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2  md:flex md:items-center md:justify-between">
                <label htmlFor="" className="text-white">
                  Comment:
                </label>
                <div className="flex flex-col">
                  <input
                    onChange={commentChangeHandler}
                    type="text"
                    onBlur={commentBlurHandler}
                    placeholder="Write Comment"
                    className={`bg-background py-2 px-6 border transition-colors duration-500 mb-2 ${
                      !commentInputIsInvalid
                        ? "border-borderColor"
                        : "border-red-500"
                    } rounded-3xl text-white`}
                  />
                  {commentInputIsInvalid && (
                    <p className="text-red-400 font-lato text-sm">
                      Please Enter Comment
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  disabled={!form}
                  type="submit"
                  className=" text-white border border-borderColor py-2 px-4 rounded-2xl transition duration-200 hover:bg-blue-400"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div
        style={{ height: "25rem", overflow: "hidden,", overflowY: "scroll" }}
      >
        {loading ? (
          <div class=" flex justify-center items-center">
            <div class="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : commentList.length === 0 ? (
          <h1 className="flex justify-center lg:w-10/12 text-white text-lg font-lato pt-12 mb-12 md:mb-0">
            No commnt found
          </h1>
        ) : (
          commentList.map((data) => (
            <CommentList
              key={data.id}
              id={data.id}
              name={data.user}
              comment={data.message}
              date={data.date}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Comment;
