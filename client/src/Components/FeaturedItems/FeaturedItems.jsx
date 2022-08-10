import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
const FeatItems = (props) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={props.image}
          alt="green iguana"
        />
      </CardActionArea>
    </Card>
  );
};

export default FeatItems;
