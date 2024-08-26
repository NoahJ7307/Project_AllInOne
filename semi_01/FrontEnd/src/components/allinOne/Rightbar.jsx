import {
  Box,
} from "@mui/material";
import React from "react";

const Rightbar = () => {
  return (
    <Box bgcolor="skyblue"

      sx={{
        flex: 2, p: 2, m: 1,
        display: {
          xs: "none",
          sm: "block"
        }
      }} >Right</Box>
  );
};

export default Rightbar;
