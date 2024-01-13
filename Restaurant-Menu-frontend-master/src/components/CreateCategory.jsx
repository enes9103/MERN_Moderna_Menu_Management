import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";

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
          <Box
            component="form"
            sx={{}}
            onSubmit={handleCreateCategory}
            ref={form}
            noValidate
            autoComplete="off"
          >
            <Card sx={{ minWidth: 275, padding: "0 16px 16px 16px" }}>
              <CardContent>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" component="div">
                    Create Category
                  </Typography>

                  <TextField
                    type="text"
                    id="username"
                    label="Category Name"
                    variant="standard"
                    name="category"
                    fullWidth
                    value={category.category}
                    onChange={handleCategoryChange}
                  />
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginLeft: "auto" }}
                >
                  Create Category
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ minWidth: 275, padding: "0 16px" }}>
            <CardContent>
              <Grid md={12}>
                <Typography variant="h6" component="div">
                  List of Categories
                </Typography>

                <List>
                  {categories.map((category, i) => (
                    <ListItem
                      key={i}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                      sx={{ paddingBottom: "0" }}
                    >
                      <ListItemAvatar>
                        <ListIcon />
                      </ListItemAvatar>
                      <ListItemText primary={category.category} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Category;
