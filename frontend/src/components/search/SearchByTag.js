import React, { useState } from "react";
import instance from "../../api/axios";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
const SearchByTag = (props) => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const tagisValid = tags.length >= 1;
  const history = useHistory();
  const searchPost = async () => {
    if (search.trim() || tags) {
      // dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      try {
        const response = await instance.get(
          `/search?searchQuery=${search || "none"}&tags=${tags}`
        );
        const data = response.data;
        props.search(data.data);
      } catch (error) {
        console.log(error);
      }
      history.push(
        `${props.token ? "/admin" : "/"}?searchQuery=${
          search || "none"
        }&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((tag) => tag !== chipToDelete));
    props.fetchData();
  };

  return (
    <>
      <div className="grid gap-y-4 md:flex items-center justify-center space-x-16 w-10/12 mx-auto">
        <ChipInput
          style={{
            margin: "6px 0",
            border: "1px solid #4c4d50",
            borderRadius: "16px",
            background: "white",
          }}
          value={tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
          label="Search Tags"
          variant="outlined"
        />
        <button
          disabled={!tagisValid}
          onClick={searchPost}
          className="py-2 px-6 bg-background text-white border border-borderColor rounded-3xl transition-colors duration-300 hover:bg-name "
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchByTag;
