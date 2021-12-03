import React, { useState } from "react";
import Entry from "./Entry";
import { MdSearch } from "react-icons/md";
import SearchByTag from "./search/SearchByTag";
import instance from "../api/axios";

const Right = (props) => {
  const [filter, setFilter] = useState("");
  const onFilter = (event) => {
    setFilter(event.target.value);
  };
  console.log(props.postData);
  async function handleSelecetedTags(items) {
    console.log(items);
    const formData = new FormData();
    formData.append("tags", items.join(","));
    try {
      const response = await instance.post(`/search`, items);
      const data = response.data;
      console.log(data);
    } catch (error) {
      window.alert("Can't Get Added2");
    }
  }

  return (
    <div
      className="lg:w-9/12 flex flex-col  my-12 md:mb-12 lg:mb-0 "
      style={{ overflow: "hidden", overflowY: "scroll", height: "700px" }}
    >
      <div className="text-white flex flex-col  md:flex-row items-center md:w-10/12 mx-auto mb-12">
        <label
          htmlFor="Filter"
          className="text-filter font-lato text-xl mb-4 md:mb-0"
        >
          FIlter
        </label>
        <div className="py-3 md:pr-32 lg:pr-16 xl:pr-64 lg:pl-4 border border-borderColor rounded-3xl flex items-center md:ml-32 lg:ml-40">
          <MdSearch className="text-filter h-8 w-8" />
          <input
            type="text"
            className="border-0 bg-background pl-4 "
            placeholder="text here"
            onChange={onFilter}
          />
        </div>
      </div>
      <div className=" md:ml-32 lg:ml-40">
        <SearchByTag
          search={props.search}
          token={props.token}
          fetchData={props.fetchData}
        />
      </div>
      <div></div>
      <div className="w-picCont mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8 p-4 pl-8 ">
        {props.postData
          .filter((data) => {
            if (filter === "") {
              return data;
            } else if (
              data.title.toLowerCase().includes(filter.toLocaleLowerCase())
            ) {
              return data;
            }
          })
          .map((data) => {
            return (
              <Entry
                token={props.token}
                fetchData={props.fetchData}
                key={data._id}
                id={data._id}
                title={data.title}
                img={data.img}
                date={data.date}
                sideBar={data.sideBar}
                views={data.views}
                pid={data.pid}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Right;
