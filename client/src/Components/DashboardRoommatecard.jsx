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
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Backdrop, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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

export default function DashboardRoommatecard({ props }) {
  const userid = useSelector((state) => state.auth.user_id);

  const navigate = useNavigate();
  const deletepost = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));

      const params = {
        roommateProfileId: props._id,
        userId: userid,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      axios
        .post("/roommateprofiles/deleteRoommateProfile", params, config)
        .then((res) => {
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const editredirector = () => {
    navigate("/roomdetailsform", { edit: true, roomdata: props });
  };
  const editHandler = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      console.log(usertoken);
      const params = {
        ...props,
        rentPrice: 3000,
        roomId: props._id,
        userId: userid,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      axios.post("/rooms/updateRoom", params, config).then((res) => {
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card sx={{ m: 3, maxWidth: 340, minHeight: 450 }}>
        <Grid item xs={8}>
          {props?.image && (
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  src={props?.image.url}
                  aria-label="recipe"
                ></Avatar>
              }
              title={props?.name}
            />
          )}
        </Grid>
        <Link style={{ textDecoration: "none" }} to={"/room/" + props._id}>
          {props?.image && (
            <CardMedia
              component="img"
              height="194"
              image={props?.image.url}
              alt="Paella dish"
            />
          )}
          <CardContent sx={{ padding: "16px 16px 0px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <Typography variant="h7" color="text.primary" fontWeight="bolder">
                Age: {props?.age}
              </Typography>
              <Typography variant="h7" color="text.primary" fontWeight="Bolder">
                Gender: {props?.gender}
              </Typography>
            </div>
            <Typography mt={1} variant="body2" color="text.secondary">
              <strong>Occupation: </strong>
              {props?.occupation}
            </Typography>
            <Typography mt={1} variant="body2" color="text.secondary">
              <strong>Looking in:</strong> {props?.lookingForRoomIn}
            </Typography>
            {/* <Typography mt={1} variant="body2" color="text.secondary">
              <strong>Looking from :</strong> {props?.lookingToMoveIn}
            </Typography> */}
            <Typography
              mt={1}
              variant="body1"
              color="#6177D4"
              fontWeight="Bolder"
            >
              BUDGET : {props?.budget}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Grid container mt={0} align="center">
            <Grid item xs={4}>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  editredirector();
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
