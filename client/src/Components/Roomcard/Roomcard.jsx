import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Grid from "@mui/material/Grid";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={8}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Dheeraj Gandhi"
          />
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              bgcolor: "#6177D4",
              color: "white",
              padding: ".5rem 1rem",
              borderRadius: ".1rem",
            }}
            variant="h7"
          >
            $2393
          </Typography>
        </Grid>
      </Grid>

      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h7" color="text.primary" fontWeight="bolder">
          Spacious rooms for rent with no deposit
        </Typography>
        <Typography variant="body2" color="text.secondary">
          5316 Tinker St, Boise, Illinois, United States
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container align="center">
          <Grid item xs={4}>
            <IconButton aria-label="add to favorites">
              <ChatBubbleOutlineIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="share">
              <StarBorderOutlinedIcon sx={{ fontSize: "28px" }} />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="location">
              <LocationOnOutlinedIcon sx={{ fontSize: "28px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
