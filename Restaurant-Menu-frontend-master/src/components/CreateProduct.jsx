import React, { useState, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";

const CreateProduct = ({ allData, fetchProducts }) => {
  const { menus, categories, products } = allData;
  const [product, setProduct] = useState({
    product: "",
    price: "",
    categoryId: "",
  });

  const form = useRef();

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/product", {
        product: product.product,
        price: product.price,
        categoryId: product.categoryId,
      });

      if (response.status === 201) {
        setProduct({
          product: "",
          price: "",
          categoryId: "",
        });

        fetchProducts();
      } else {
        console.error("Failed to create product");
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
            onSubmit={handleCreateProduct}
            ref={form}
            noValidate
            autoComplete="off"
          >
            <Card sx={{ minWidth: 275, padding: "0 16px 16px 16px" }}>
              <CardContent>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" component="div">
                    Creat Product
                  </Typography>

                  <TextField
                    type="text"
                    id="username"
                    label="Product Name"
                    variant="standard"
                    name="product"
                    fullWidth
                    value={product.product}
                    onChange={handleProductChange}
                  />

                  <select
                    id="category"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleProductChange}
                  >
                    <option value="">Select a category...</option>
                    {categories.map((category, i) => (
                      <option key={i} value={category._id}>
                        {category.category}
                      </option>
                    ))}
                  </select>

                  <TextField
                    type="text"
                    id="username"
                    label="Product Price"
                    variant="standard"
                    name="price"
                    fullWidth
                    value={product.price}
                    onChange={handleProductChange}
                  />
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginLeft: "auto" }}
                >
                  Create Product
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
                  List of Products
                </Typography>

                <List>
                  {products.map((item, i) => (
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
                      <ListItemText primary={item.product} />
                      <ListItemText primary={item.price} />
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

export default CreateProduct;
