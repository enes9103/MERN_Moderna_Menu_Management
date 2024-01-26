import React, { useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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

const Menu = ({ allData, fetchMenus }) => {
  const { menus, categories, products } = allData;

  const [menu, setMenu] = useState({
    menu: "",
    products: [],
    categories: [],
  });
  const form = useRef();

  const handleMenuChange = (name, value) => {
    setMenu({ ...menu, [name]: value });
  };

  const handleCreateMenu = async (event) => {
    console.log(menu.menu);
    console.log(menu.products);
    console.log(menu.categories);

    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/menu", {
        menu: menu.menu,
        products: menu.products.map((item) => item.value),
        categories: menu.categories.map((item) => item.value),
      });

      if (response.status === 201) {
        setMenu({
          menu: "",
          products: [],
          categories: [],
        });
        fetchMenus();
      } else {
        console.error("Failed to create menu");
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
            ref={form}
            onSubmit={handleCreateMenu}
            noValidate
            autoComplete="off"
          >
            <Card sx={{ minWidth: 275, padding: "0 16px 16px 16px" }}>
              <CardContent>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" component="div">
                    Create Menu
                  </Typography>

                  <TextField
                    type="text"
                    id="username"
                    label="Manu Name"
                    variant="standard"
                    fullWidth
                    name="menu"
                    value={menu.menu}
                    onChange={(e) => handleMenuChange("menu", e.target.value)}
                  />

                  <label className="About_username">Categories:</label>
                  <Select
                    id="category"
                    name="categories"
                    isMulti
                    options={categories.map((category) => ({
                      value: category._id,
                      label: category.category,
                    }))}
                    value={menu.categories}
                    onChange={(selectedOptions) =>
                      handleMenuChange(
                        "categories",
                        selectedOptions ? selectedOptions : []
                      )
                    }
                  />

                  <label className="About_username">Products:</label>
                  <Select
                    id="product"
                    name="products"
                    isMulti
                    options={products.map((product) => ({
                      value: product._id,
                      label: product.product,
                    }))}
                    value={menu.products}
                    onChange={(selectedOptions) =>
                      handleMenuChange(
                        "products",
                        selectedOptions ? selectedOptions : []
                      )
                    }
                  />
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginLeft: "auto" }}
                >
                  Create Menu
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
                  List of Menus
                </Typography>

                <List>
                  {menus.map((menu, i) => (
                    <Link to={`/dashboard/menuId/${menu._id}`} key={i}>
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
                        <ListItemText primary={menu.menu} />
                      </ListItem>
                    </Link>
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

export default Menu;
