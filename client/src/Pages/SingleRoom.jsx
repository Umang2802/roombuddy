import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Fab,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";
import RoomImage from "../Assets/room.jpg";
import Map from "../Assets/map.jpg";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useEffect } from "react";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const SingleRoom = () => {
  const params = useParams();
  const [name, setName] = useState("umang");
  const [desc, setDesc] = useState("ntng");
  const [bhk, setBhk] = useState("3");
  const [bath, setBath] = useState("4");
  const [type, setType] = useState("Flat");
  const [tenantNo, setTenantNo] = useState("2");
  const [preferences, setPreferences] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [address, setAddress] = useState("");
  const [tenants, setTenants] = useState([]);
  const [images, setImages] = useState([]);
  const tokentest = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));

      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      axios
        .get("/rooms/" + params.id, config)
        .then((res) => {
          console.log("response", res);
          setName(res.data.name);
          setDesc(res.data.description);
          setBhk(res.data.bhk);
          setBath(res.data.bathroom);
          setType(res.data.propertyType);
          setTenantNo(res.data.noOfTenants);
          setPreferences(res.data.preferences);
          setAddress(res.data.address);
          setTenants(res.data.tenantDetails);
          setImages(res.data.images);
        })
        .catch((err) => {
          console.log("Error", err);
        });
        

      console.log("working");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    tokentest();
  }, []);

  if(images[0]){
    images[0].rows = 4;
    images[0].cols = 2;
  }

  const details = [
    {
      value: "BHK",
      state: bhk,
    },
    {
      value: "Bathroom",
      state: bath,
    },
    {
      value: "Type",
      state: type,
    },
    {
      value: "No of Tenants",
      state: tenantNo,
    },
  ];

  // const tenants = [
  //   {
  //     id: 0,
  //     name: "Helen kelly",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna,porttitor rhoncus dolor purus non enim praesent elementum facilisisleo, ve",
  //   },
  //   {
  //     id: 1,
  //     name: "Helen kelly",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna,porttitor rhoncus dolor purus non enim praesent elementum facilisisleo, ve",
  //   },
  // ];

  // const itemData = [
  //   {
  //     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  //     title: "Breakfast",
  //     rows: 4,
  //     cols: 2,
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  //     title: "Burger",
  //     rows: 2,
  //     cols: 1,
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  //     title: "Camera",
  //     rows: 2,
  //     cols: 1,
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  //     title: "Coffee",
  //     rows: 2,
  //     cols: 1,
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  //     title: "Hats",
  //     rows: 2,
  //     cols: 1,
  //   },
  // ];

  return (
    <>
      {clicked ? (
        <>
          <Fab
            sx={{
              position: "fixed",
              left: "2%",
              top: "3%",
              bgcolor: "white",
            }}
            onClick={() => setClicked(false)}
          >
            <ArrowBackIosRoundedIcon />
          </Fab>
          <Container maxWidth="lg" sx={{ p: 10 }}>
            <ImageList cols={1} gap={10}>
              {images.map((item) => (
                <ImageListItem key={item.url}>
                  <img
                    src={`${item.url}?fit=crop&auto=format`}
                    srcSet={`${item.url}?fit=crop&auto=format&dpr=2 2x`}
                    alt={"img"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Container>
        </>
      ) : (
        <>
          <Navbar />
          <Container maxWidth="lg" sx={{ my: 5 }}>
            <ImageList
              variant="quilted"
              cols={4}
              rowHeight={90}
              gap={8}
              sx={{ borderRadius: "8px", position: "relative" }}
            >
              {images.map((item) => (
                <ImageListItem
                  key={item.url}
                  cols={item.cols || 1}
                  rows={item.rows || 2}
                >
                  <img
                    {...srcset(item.url, 500, item.rows, item.cols)}
                    alt={"img"}
                    loading="lazy"
                    sx={{ pointer: "cursor" }}
                  />
                </ImageListItem>
              ))}
              <Box
                sx={{
                  position: "absolute",
                  right: "1%",
                  bottom: "2%",
                }}
              >
                <Fab
                  size="small"
                  sx={{
                    bgcolor: "white",
                    borderRadius: "6px",
                    border: "1px solid",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "x-small",
                  }}
                  variant="extended"
                  aria-label="add"
                  onClick={() => setClicked(true)}
                >
                  <ViewCarouselIcon />
                  &nbsp;Show all photos
                </Fab>
              </Box>
            </ImageList>
            <Box>
              <Typography variant="h4" sx={{ my: 4 }}>
                {name}
              </Typography>
              <Button
                disableElevation={true}
                disableRipple={true}
                variant="contained"
                sx={{ cursor: "default", bgcolor: "#6177D4" }}
              >
                Rent: &nbsp;$22
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                disableElevation={true}
                disableRipple={true}
                variant="contained"
                sx={{ cursor: "default", bgcolor: "#6177D4" }}
              >
                Predicted rent: &nbsp;$21
              </Button>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
                Property details
              </Typography>
              <Typography variant="body1" sx={{ my: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus magna fringilla
                urna, porttitor rhoncus dolor purus non enim praesent elementum
                facilisis leo, vel {desc}
              </Typography>
              <Box>
                {details.map((item) => (
                  <Typography
                    variant="body1"
                    sx={{ color: "#717171", fontWeight: "bold", mr: 8 }}
                    component="span"
                    key={item.value}
                  >
                    {item.value}:&nbsp;&nbsp;{item.state}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Preferences
              </Typography>
              {preferences.map((item) => (
                <Typography
                  variant="body1"
                  sx={{ color: "#717171", mr: 10 }}
                  component="span"
                  key={item.value}
                >
                  {item}
                </Typography>
              ))}
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Location
              </Typography>
              <Card elevation={0} sx={{}}>
                <CardMedia component="img" height="350" image={Map} alt="map" />
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">{address}</Typography>
                </CardContent>
              </Card>
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Roommates currently staying
              </Typography>
              <Box>
                {tenants.map((item) => (
                  <Box key={item._id}>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" sx={{ my: 1 }}>
                      {item.bio}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default SingleRoom;
