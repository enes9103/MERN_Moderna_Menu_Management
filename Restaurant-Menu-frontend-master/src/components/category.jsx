import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Category = ({ allData, fetchCategories }) => {
  const { menus, categories, products } = allData;

  const [category, setCategory] = useState({
    category: "",
  });
  const form = useRef();

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
