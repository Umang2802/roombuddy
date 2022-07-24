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
import { useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Backdrop, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import PostChat from "../../Components/Chat/PostChat";
// import { ChatState } from "../../Context/Provider";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
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

export default function DashboardRoomcard({ props }) {
  const userid = useSelector((state) => state.auth.user_id);

  const navigate = useNavigate();
  const deletepost = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      console.log(usertoken);
      const params = {
        roomId: props._id,
        userId: userid,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      axios.post("/rooms/deleteRoom", params, config).then((res) => {
        console.log(res.data);
      });

      console.log("working");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card sx={{ m: 3, maxWidth: 340, minHeight: 450 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={8}>
            {props?.images?.length > 0 && (
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    src={props?.images[0].url}
                    aria-label="recipe"
                  ></Avatar>
                }
                title={props?.user.username}
              />
            )}
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
              {props.rentPrice}
            </Typography>
          </Grid>
        </Grid>
        <Link style={{ textDecoration: "none" }} to={"/room/" + props._id}>
          {props?.images?.length > 0 && (
            <CardMedia
              component="img"
              height="194"
              image={props?.images[0].url}
              alt="Paella dish"
            />
          )}
          <CardContent>
            <Typography variant="h7" color="text.primary" fontWeight="bolder">
              {props?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props?.address}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Grid container align="center">
            <Grid item xs={4}>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  navigate("/roomDetailsForm", {
                    state: {
                      id: props._id,
                      payload: props,
                      status: "edit",
                    },
                  });
                }}
              >
                <EditOutlinedIcon size="small" />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  deletepost();
                }}
                aria-label="delete"
              >
                <DeleteOutlineOutlinedIcon size="small" />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}
