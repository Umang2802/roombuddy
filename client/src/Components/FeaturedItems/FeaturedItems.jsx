import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
const FeatItems = (props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <img src={props.image} alt="image" />
        <Paper elevation={3} />
      </Box>
    </>
  );
};

export default FeatItems;
