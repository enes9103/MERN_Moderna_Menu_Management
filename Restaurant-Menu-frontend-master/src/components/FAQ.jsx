import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FAQ = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = data.filter((item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  return (
    <Box sx={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "2rem", fontWeight: 600, color: '#212943' }}>
        How can we help you?
      </Typography>
      <Searchbar onSearchChange={handleSearchChange} />
      <List sx={{ marginTop: "2rem" }}>
        {searchResults.map((item) => (
          <Question key={item.id} question={item.question} answer={item.answer} />
        ))}
      </List>
    </Box>
  );
};

const SearchbarWrapper = (props) => (
  <Box
    component="form"
    sx={{
      display: "flex",
      width: "35rem",
      backgroundColor: "#fff",
      alignItems: "center",
      margin: "0 auto",
      borderRadius: "1rem",
      position: "relative",
    }}
    onSubmit={(e) => e.preventDefault()}
  >
    {props.children}
  </Box>
);

const SearchbarInput = (props) => (
  <TextField
    {...props}
    sx={{
      fontFamily: "'Poppins', sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
      border: "none",
      padding: "1rem",
      paddingLeft: "4rem",
      width: "100%",
      boxShadow: "0px 5px 13px 0px #DEE4F1",
      borderRadius: "0.8rem",
      "&:focus": {
        outline: "none",
        boxShadow: "0 0 0 1.5px #DEE4F1,  0px 5px 13px 0px #DEE4F1",
      },
    }}
  />
);

const SearchIconWrapper = (props) => (
  <Box
    component="div"
    sx={{
      position: "absolute",
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
    }}
  >
    {props.children}
  </Box>
);

const Searchbar = ({ onSearchChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearchChange(e);
  };

  return (
    <SearchbarWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchbarInput
        type="text"
        placeholder="Describe your issue"
        onChange={handleChange}
        value={value}
      />
    </SearchbarWrapper>
  );
};

const Question = ({ question, answer }) => {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <ListItem sx={{ borderBottom: "1px solid #DEE4F1", padding: "1rem" }}>
      <Box
        sx={{
          width: "35rem",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#212943",
            justifyContent: "space-between",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleClick}
        >
          <Typography>{question}</Typography>
          <IconButton onClick={handleClick}>
            <ArrowDropDownIcon
              className={isActive ? "active" : ""}
              sx={{
                width: "1rem",
                height: "1.5rem",
                fill: "#9EA6AE",
                "&.active": {
                  transform: "rotate(180deg)",
                },
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
          </IconButton>
        </Box>
        <Collapse in={isActive}>
          <Typography
            sx={{
              textAlign: "left",
              paddingTop: "1.5rem",
              fontWeight: "light",
              fontSize: "0.8rem",
              lineHeight: 1.5,
              color: "#9EA6AE",
              height: "0%",
              animation: "slidein 0.4s",
              animationFillMode: "forwards",
            }}
          >
            {answer}
          </Typography>
        </Collapse>
      </Box>
    </ListItem>
  );
};

export default FAQ;
