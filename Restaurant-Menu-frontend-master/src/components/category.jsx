import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Category = ({ allData, fetchCategories }) => {
  const { menus, categories, products } = allData;

  const [category, setCategory] = useState({
    category: "",
  });
  const form = useRef();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/category", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category.category,
        }),
      });

      if (response.ok) {
        // Handle success, e.g., clear form fields or show a success message
        setCategory({
          category: "",
        });
        fetchCategories();
      } else {
        // Handle error, e.g., display an error message
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="step-title">
        <div className="step-content">
          <h2>Categories</h2>
        </div>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="subcat-form-container">
            <form
              className="cat-edit-form"
              onSubmit={handleCreateCategory}
              ref={form}
            >
              <div className="username">
                <label className="About_username">Category name:</label> <br />
                <input
                  className="subcat-edit-input"
                  type="text"
                  id="username"
                  placeholder="Category name"
                  name="category"
                  value={category.category}
                  onChange={handleCategoryChange}
                />
              </div>
              <button className="subcat-edit-button" type="submit">
                Create
              </button>
            </form>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className="list-category">
            <h3 className="list1">list of Categories</h3>
            {categories.map((category, i) => (
              <p key={i}>{category.category}</p>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Category;
