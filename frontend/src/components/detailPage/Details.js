import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Comment from "../comments/Comment";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
} from "react-share";
const Details = (props) => {
  const shareUrl = "www.amazonadvisor.biz";
  console.log(props.entry);
  return (
    <>
      <div className="lg:w-8/12 mx-auto flex flex-col lg:ml-32 ">
        <div className="py-2">
          <Link to="/">
            <BiArrowBack className="h-10 w-10  text-navText" />
          </Link>
        </div>

        <div className="lg:w-10/12 :h-picDetails  mb-8">
          <img
            src={`http://localhost:5000/${props.entry.img}`}
            className="rounded-3xl w-full object-cover md:object-fill md:h-full"
            alt=""
          />
        </div>
        {!props.token && (
          <div className="lg:w-10/12 flex justify-end">
            <FacebookShareButton
              url={shareUrl}
              quote={"Title or jo bhi aapko likhna ho"}
              hashtag={"#portfolio..."}
              className="mr-2 transition transform duration-300 hover:-translate-y-4 hover:scale-110"
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
              url={shareUrl}
              quote={"Title or jo bhi aapko likhna ho"}
              hashtag={"#portfolio..."}
              className="mr-2 transition transform duration-300 hover:-translate-y-4 hover:scale-110"
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={shareUrl}
              quote={"Title or jo bhi aapko likhna ho"}
              hashtag={"#portfolio..."}
              className="mr-2 transition transform duration-300 hover:-translate-y-4 hover:scale-110"
            >
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>
            <RedditShareButton
              url={shareUrl}
              quote={"Title or jo bhi aapko likhna ho"}
              hashtag={"#portfolio..."}
              className="mr-2 transition transform duration-300 hover:-translate-y-4 hover:scale-110"
            >
              <RedditIcon size={40} round={true} />
            </RedditShareButton>
            <TwitterShareButton
              url={shareUrl}
              quote={"Title or jo bhi aapko likhna ho"}
              hashtag={"#portfolio..."}
              className="mr-2 transition transform duration-300 hover:-translate-y-4 hover:scale-110"
            >
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
          </div>
        )}
        <div>
          <h1 className="text-white font-lato font-semibold   text-2xl w-1/2 pt-6 pb-8">
            {props.entry.title}
          </h1>
        </div>
        <div className="lg:w-10/12 flex justify-between pb-8">
          <div className="text-white font-lato">
            {props.entry.date.substring(0, 10)}
          </div>
          <div className="text-white flex items-center">
            <BsEyeFill className="text-navColor text-white mr-2" />
            {props.entry.views} reads
          </div>
        </div>
        <div>
          <p className="text-white lg:w-10/12 text-justify font-lato">
            {props.entry.description}
          </p>
        </div>
        <Comment
          addComment={props.addComment}
          fetchData={props.fetchData}
          commentData={props.commentData}
          token={props.token}
        />
      </div>
    </>
  );
};

export default Details;
