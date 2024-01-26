import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Title from "./Title";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const QRCode = () => {
  const menuId = useParams();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [menu, setMenu] = useState([]);

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

  return (
    <>
      <Title>Menu QR Code</Title>
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 180 }}
          image={`data:image/png;base64,${qrCodeUrl}`}
          alt="Live from space album cover"
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Mac Miller
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Download</Button>
            </CardActions>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default QRCode;
