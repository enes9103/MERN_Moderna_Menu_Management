import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useParams } from "react-router";

export default function MenuDetailTable() {
  const columns = [
    { id: "images", label: "Products", minWidth: 100 },
    { id: "product", label: "Category", minWidth: 100 },
    { id: "edit", label: "Price", minWidth: 100 },
    { id: "edit", label: "Edit price", minWidth: 100 },
  ];
  const menuId = useParams();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [menu, setMenu] = useState([]);
  const [price, setPrice] = useState({
    price: "",
  });
  const form = useRef();

  useEffect(() => {
    // Fetch the QR code image URL from the server
    axios
      .get(`http://localhost:8080/menu/qrCode/${menuId.id}`)
      .then((response) => {
        setQrCodeUrl(response.data);
        console.log(qrCodeUrl);
      })
      .catch((error) => {
        console.error("Error fetching QR code:", error);
      });
  }, [menuId.id]);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/menu/${menuId.id}`
      );
      setMenu(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenus(); // Initial fetch when component mounts
  }, [menuId.id]);

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPrice({ ...price, [name]: value });
  };

  const handleEditPrice = async (event, id) => {
    console.log(id);
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/product/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: price.price,
        }),
      });

      if (response.ok) {
        setPrice({
          price: "",
        });
        fetchMenus();
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Title>Menu Details ({menu.menu})</Title>

      <TableContainer sx={{ maxHeight: "600px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.products?.map((product, i) => (
              <TableRow key={i}>
                <TableCell>{product.product}</TableCell>
                <TableCell>{product.categoryId.category}</TableCell>
                <TableCell>{product.price} $</TableCell>
                <TableCell>
                  <form
                    ref={form}
                    onSubmit={(event) => handleEditPrice(event, product._id)}
                  >
                    <input
                      className="price-input"
                      type="text"
                      placeholder="Price"
                      name="price"
                      value={price.price}
                      onChange={handlePriceChange}
                    />
                    <button
                      type="submit"
                      className="prodash-button"
                      //   onClick={() => getProductById(product._id)}
                    >
                      Edit Price{" "}
                    </button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
