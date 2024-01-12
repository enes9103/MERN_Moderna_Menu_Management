import React from "react";
import "./menuDetails.css";
import Paper from "@mui/material/Paper";
import MenuDetailTable from "../../components/MenuDetailTable";
import Grid from "@mui/material/Grid";
import QRCode from "../../components/QRCode";

function MenuDetails() {
  return (
    <Grid container spacing={3}>
      {/* Menu Details */}
      <Grid item xs={12} md={8} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuDetailTable />
        </Paper>
      </Grid>

      {/* QR Code */}
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <QRCode />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MenuDetails;
