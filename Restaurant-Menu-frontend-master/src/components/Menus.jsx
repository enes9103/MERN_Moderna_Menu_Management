import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

export default function Menus() {
  return (
    <React.Fragment>
      <Title>Recent Menus</Title>
      
      <Link color="primary" href="dashboard/menu-creator">
        Create New Menu
      </Link>
    </React.Fragment>
  );
}
