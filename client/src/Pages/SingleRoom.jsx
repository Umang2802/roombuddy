import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Fab,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ReportIcon from "@mui/icons-material/Report";
import Modal from "@mui/material/Modal";
import Navbar from "../Components/Navbar/Navbar";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SingleRoom = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bhk, setBhk] = useState("");
  const [bath, setBath] = useState("");
  const [type, setType] = useState("");
  const [tenantNo, setTenantNo] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [address, setAddress] = useState("");
  const [tenants, setTenants] = useState([]);
  const [images, setImages] = useState([]);
  const [predictRent, setPredictRent] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [rent, setRent] = React.useState();
  const [coordinates, setCoordinates] = React.useState();
  const [total_sqft, setTotal_Sqft] = React.useState();
  const [reportOption, setReportOption] = useState("Inappropriate Post");

  const timer = React.useRef();

  const navigate = useNavigate();

  useEffect(() => {
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
            setRent(res.data.rentPrice);
            setCoordinates(res.data.coordinates);
            setTotal_Sqft(res.data.total_sqft);
          })
          .catch((err) => {
            console.log("Error", err);
          });

        console.log("working");
      } catch (e) {
        console.log(e);
      }
    };
    tokentest();
  }, [params.id]);

  if (images[0]) {
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
  const handlelocationClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(lat, lng);
  };

  const clickedbtn = () => {
    setSuccess(false);
    setLoading(true);
    const data = {
      location: address,
      total_sqft: total_sqft,
      bath: bath,
      bhk: bhk,
    };
    axios.post("/model", data).then((res) => {
      console.log(res.data);
      setPredictRent(res.data);
    });
    timer.current = window.setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000);
  };

  const buttonSx = {
    ...(success && {
      bgcolor: "#6177D4",
      cursor: "default",
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setReportOption(event.target.value);
  };
  const reportPost = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));

      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      const data = {
        roomId: params.id,
        msg: reportOption,
      };
      console.log(params.id);
      axios
        .post("/rooms/reportRoom", data, config)
        .then((res) => {
          console.log("response", res);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (e) {
      console.log(e);
    }
  };
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
          <Fab
            sx={{
              position: "absolute",
              left: "5%",
              top: "15%",
              bgcolor: "white",
            }}
            onClick={() => navigate("/room")}
          >
            <ArrowBackIosRoundedIcon />
          </Fab>
          <Container maxWidth="lg" sx={{ my: 5 }}>
            <ImageList
              variant="quilted"
              cols={4}
              rowHeight={90}
              gap={8}
              sx={{ borderRadius: "8px", position: "relative" }}
            >
              {images.map((item, i) => {
                return (
                  <>
                    {i < 5 && (
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
                    )}
                  </>
                );
              })}
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
                Rent: &nbsp;{rent}
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                sx={buttonSx}
                onClick={predictRent === "" ? clickedbtn : ""}
                disableElevation={predictRent === "" ? false : true}
                disableRipple={predictRent === "" ? false : true}
              >
                {success
                  ? `Predicted rent: ${predictRent}`
                  : "Click button to Predict rent"}
              </Button>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
                Property details
              </Typography>
              <Typography variant="body1" sx={{ my: 1 }}>
                {desc}
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
                <button
                  style={{
                    marginRight:"10px",
                    background: "#6177d4",
                    border: "1px solid #6177d4",
                    borderRadius: "35px",
                    padding: "0.4rem 1.8rem",
                    color: "white",
                    fontSize: "1rem",
                  }}
                  key={item.value}
                >
                  {item}
                </button>
              ))}
            </Box>
            <Divider />
            <Box sx={{ my: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Location
              </Typography>
              <Card elevation={0}>
                <MapContainer
                  style={{ height: "50vh", width: "100%" }}
                  center={coordinates}
                  zoom={13}
                  scrollWheelZoom={false}
                  onClick={handlelocationClick}
                >
                  {" "}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={coordinates}
                    icon={
                      new Icon({
                        iconUrl: markerIconPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })
                    }
                  >
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>

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
            <Button
              sx={{ color: "#6177D4", border: "solid 1px #6177D4" }}
              variant="outlined"
              onClick={handleOpen}
            >
              <ReportIcon />
              Report
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="p">
                  Report this post due to the following reason
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={reportOption}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Inappropriate Post"
                      control={<Radio />}
                      label="Inappropriate Post"
                    />
                    <FormControlLabel
                      value="Noticed Vulgarity"
                      control={<Radio />}
                      label="Noticed Vulgarity"
                    />
                    <FormControlLabel
                      value="Found as spam"
                      control={<Radio />}
                      label="Found as spam"
                    />
                    <FormControlLabel
                      value="Bad experience in chatting"
                      control={<Radio />}
                      label="Bad experience in chatting"
                    />
                  </RadioGroup>
                </FormControl>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={reportPost}>Submit</Button>
                </div>
              </Box>
            </Modal>
          </Container>
        </>
      )}
    </>
  );
};

export default SingleRoom;
