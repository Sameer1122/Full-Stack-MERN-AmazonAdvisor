import React from "react";
import AdCreate from "../components/admin/AdCreate";
import AddUser from "../components/admin/AddUser";
import Adlist from "../components/admin/Adlist";
import AdminForm from "../components/admin/AdminForm";
import ProfileForm from "../components/admin/ProfileForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Left from "../components/left";
import Right from "../components/Right";

const Admin = (props) => {
  const onNewEntry = (input) => {
    props.onNewEntry(input);
  };
  const editProfile = (input) => {
    props.editProfile(input);
  };
  return (
    <>
      <div className="my-10">
        <div
          className="border border-borderColor md:p-8 rounded-3xl"
          style={{ width: "97%", margin: "auto" }}
        >
          <Header logout={props.logout} token={props.token} />
          <nav className="text-white font-lato font-bold text-center text-4xl py-8">
            Amazon Advisor Admin Panel
          </nav>
          <div className="grid justify-center gap-y-8 items-center md:w-8/12 mx-auto">
            <div className="flex items-center space-x-8">
              <ProfileForm
                editProfile={editProfile}
                fetchData={props.fetchData}
              />
              <AdminForm onNewEntry={onNewEntry} fetchData={props.fetchData} />
            </div>
            <div className="flex space-x-8 items-center">
              <AdCreate />
              <AddUser />
            </div>
          </div>
          <div className="w10/12 mx-auto">
            <Adlist />
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-between lg:w-11/12 mx-auto h-full">
            <Left Profile={props.Profile} />
            <Right
              search={props.search}
              postData={props.postData}
              token={props.token}
              fetchData={props.fetchData}
            />
          </div>

          <div classNme=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
