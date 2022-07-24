import {
  Button,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import Bar from "../Components/Bar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Components/Navbar/Navbar";
import { postRoom } from "../Services";
import * as actionCreator from "../State/Actions/postroomAction";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useLocation } from "react-router-dom";
import axios from "axios";

const types = [
  {
    value: "Flat",
  },
  {
    value: "House",
  },
  {
    value: "Bungalow",
  },
];

const rule = [
  {
    id: 0,
    value: "SMOKING",
    ticked: false,
    cancelled: false,
  },
  {
    id: 1,
    value: "ALCOHOL",
    ticked: false,
    cancelled: false,
  },
  {
    id: 2,
    value: "PETS",
    ticked: false,
    cancelled: false,
  },
  {
    id: 3,
    value: "VEGETARAIN",
    ticked: false,
    cancelled: false,
  },
];

const amenity = [
  {
    id: 0,
    variant: "",
    onClick: false,
    value: "AC",
  },
  {
    id: 1,
    variant: "",
    onClick: false,
    value: "Pool",
  },
  {
    id: 2,
    variant: "",
    onClick: false,
    value: "Dining Area",
  },
  {
    id: 3,
    variant: "",
    onClick: false,
    value: "Parking Area",
  },
  {
    id: 4,
    variant: "",
    onClick: false,
    value: "Garden",
  },
  {
    id: 5,
    variant: "",
    onClick: false,
    value: "Laundry",
  },
];

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoomDetailsForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [bath, setBath] = useState(1);
  const [bhk, setBhk] = useState(1);
  const [type, setType] = useState("Flat");
  const [rules, setRules] = useState(rule);
  const [pics, setPics] = useState([]);
  const [rent, setRent] = useState("0");
  const [amenities, setAmenities] = useState(amenity);
  const [tenantNo, setTenantNo] = useState(1);
  const [tName, setTName] = useState("");
  const [tBio, setTBio] = useState("");
  const [tenantDetails, setTenantDetails] = useState([]);
  const [predictedRent, setPredictedRent] = useState("0");
  const [preferences, setPreferences] = useState([]);
  const [preferenceItem, setPreferenceItem] = useState("");

  useEffect(() => {
    if (location.state.status == "edit") {
      const data = location.state.payload;
      setName(data.name);
      setDesc(data.description);
      setAddress(data.address);
      setBath(data.bathroom);
      setBhk(data.bhk);
      setType(data.propertyType);
      setPics(data.images);

      setRent(data.rentPrice);
      // setAmenities(data.amenities);
      setTenantNo(data.noOfTenants);
      setTenantDetails(data.tenantDetails);
      setPreferences(data.preferences);
      const rules1 = [];

      rules1.push({ id: 0, ticked: !data.smoking, cancelled: data.smoking });
      rules1.push({ id: 1, ticked: !data.alcohol, cancelled: data.alcohol });
      rules1.push({ id: 2, ticked: !data.pets, cancelled: data.pets });
      rules1.push({
        id: 3,
        ticked: !data.vegetarian,
        cancelled: data.vegetarian,
      });

      for (let i = 0; i < 4; i++) {
        if (rules1[i].ticked == false) {
          tickedRulesHandler(rules1[i]);
        } else {
          cancelledRulesHandler(rules1[i]);
        }
      }
      for (let i = 0; i < data.amenities.length; i++) {
        console.log("orginal", amenities);
        for (let j = 0; j < amenity.length; j++) {
          if (data.amenities[i] == amenities[j].value) {
            amenityClickHandler(amenities[j]);
            console.log("hellow world");
          }
        }
      }
      console.log("original array ", rules);
    } else {
      console.log("false");
    }
  }, []);

  const Input = styled("input")({
    display: "none",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bhkOptions = [];
  for (let i = 1; i <= 6; i++) {
    bhkOptions.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const bathOptions = [];
  for (let i = 1; i <= 6; i++) {
    bathOptions.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const tickedRulesHandler = (item) => {
    console.log("runing");
    setRules(
      rules.map((rule) =>
        rule.id === item.id
          ? {
              ...rule,
              ticked: true,
              cancelled: false,
            }
          : { ...rule }
      )
    );
  };

  const cancelledRulesHandler = (item) => {
    setRules(
      rules.map((rule) =>
        rule.id === item.id
          ? {
              ...rule,
              ticked: false,
              cancelled: true,
            }
          : { ...rule }
      )
    );
  };

  const picsInputHandler = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      fileToDataUri(e.target.files[i]).then((dataUri) => {
        setPics((prevPics) => [...prevPics, dataUri]);
      });
    }
  };

  const coverImageChangeHandler = (event) => {
    fileToDataUri(event.target.files[0]).then((dataUri) => {
      setPics(
        pics.map((v, i) => {
          if (i === 0) return dataUri;
          return v;
        })
      );
    });
  };

  const amenityClickHandler = (item) => {
    console.log("running");
    setAmenities(
      amenities.map((amenity) =>
        amenity.id === item.id
          ? amenity.onClick === true
            ? {
                ...amenity,
                variant: "",
                onClick: false,
              }
            : {
                ...amenity,
                variant: "outlined",
                onClick: true,
              }
          : { ...amenity }
      )
    );
  };

  const tenantHandler = () => {
    setTenantDetails((prevTenant) => [
      ...prevTenant,
      {
        name: tName,
        bio: tBio,
      },
    ]);
  };

  const tenantFields = [];
  for (let i = 1; i <= tenantNo; i++) {
    tenantFields.push(<h4>TENANT {i} NAME: </h4>);
    tenantFields.push(
      <TextField
        variant="filled"
        required
        name="tenant"
        type="text"
        value={tenantDetails[i - 1]?.name}
        InputLabelProps={{ style: { fontSize: 12 } }}
        onChange={(e) => {
          setTName(e.target.value);
        }}
        sx={{ mb: 3, p: 0, width: "30%" }}
        id="outlined-size-small"
        size="small"
      />
    );
    tenantFields.push(<h4>TENANT {i} BIO: </h4>);
    tenantFields.push(
      <TextField
        id="filled-multiline-static"
        multiline
        required
        value={tenantDetails[i - 1]?.bio}
        onChange={(e) => {
          setTBio(e.target.value);
        }}
        rows={3}
        variant="filled"
        sx={{ mb: 2, p: 0, width: "55%" }}
        size="small"
      />
    );
    tenantFields.push(<br />);
    tenantFields.push(
      <Button
        sx={{ mb: 4 }}
        variant="contained"
        onClick={() => tenantHandler()}
      >
        Add
      </Button>
    );
  }

  const preferencesHandler = () => {
    if (preferenceItem === "" || preferenceItem === " ") {
      alert("Enter your Preferences");
    } else {
      setPreferences((preference) => [...preference, preferenceItem]);
      setPreferenceItem("");
    }
  };

  const deletePreferencesHandler = (item) => {
    setPreferences(preferences.filter((preference) => preference !== item));
  };

  const handleSubmit = (event) => {
    const amenitydata = [];
    event.preventDefault();
    for (let i = 0; i < amenities.length; i++) {
      if (amenities[i].onClick === true) {
        amenitydata.push(amenities[i].value);
      }
    }

    const roomdata = {
      name: name,
      address: address,
      description: desc,
      bhk: bhk,
      bathroom: bath,
      propertyType: type,
      smoking: rule[0].ticked,
      alcohol: rule[1].ticked,
      pets: rule[2].ticked,
      vegetarian: rule[3].ticked,
      noOfTenants: tenantNo,
      amenities: amenitydata,
      preferences: preferences,
      rentPrice: rent,
      images: pics,
      tenantDetails: tenantDetails,
    };
    console.log("type", typeof roomdata.images);
    dispatch(actionCreator.postRoomAction(roomdata));
  };
  const handleUpdate = async (event) => {
    try {
      const amenitydata = [];
      event.preventDefault();
      for (let i = 0; i < amenities.length; i++) {
        if (amenities[i].onClick === true) {
          amenitydata.push(amenities[i].value);
        }
      }

      const roomdata = {
        name: name,
        address: address,
        description: desc,
        bhk: bhk,
        bathroom: bath,
        propertyType: type,
        smoking: rule[0].ticked,
        alcohol: rule[1].ticked,
        pets: rule[2].ticked,
        vegetarian: rule[3].ticked,
        noOfTenants: tenantNo,
        amenities: amenitydata,
        preferences: preferences,
        rentPrice: rent,
        images: pics,
        tenantDetails: tenantDetails,
        roomId: location.state.id,
        userId: location.state.payload.user._id,
      };
      const usertoken = JSON.parse(localStorage.getItem("token"));

      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      axios.post("/rooms/updateRoom", roomdata, config).then((res) => {
        console.log(res.data);
      });

      console.log("working");
    } catch (e) {
      console.log(e);
    }
    console.log("updated post");
  };

  // useEffect(() => {
  //   console.log(preferences);
  // });

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Box
          component="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", py: 1 }}>
            Room Details
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            Choose the options which match your personality. It will take a
            couple of minutes.
          </Typography>
          <Box>
            <Bar props="PROPERTY ADDRESS" />
            <Typography sx={{ fontSize: 16, mb: 1 }}>PROPERTY NAME</Typography>
            <TextField
              variant="filled"
              name="name"
              type="text"
              //label="Property Name"
              required
              // InputProps={{ style: { padding:0 } }}
              // InputLabelProps={{ style: { padding: 0 } }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%", bgcolor: "" }}
              id="outlined-size-small"
              size="small"
            />
            <br />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              PROPERTY ADDRESS
            </Typography>
            <TextField
              variant="filled"
              //label="Property Address"
              required
              name="address"
              type="text"
              id="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mb: 4, p: 0, width: "30%" }}
              size="small"
            />
          </Box>
          <Box>
            <Bar props="PROPERTY DETAILS" />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              PROPERTY DESCRIPTION
            </Typography>
            <TextField
              id="filled-multiline-static"
              multiline
              rows={3}
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              variant="filled"
              sx={{ mb: 4, p: 0, width: "55%" }}
              size="small"
            />
            <br />
            <Box sx={{ display: "flex" }}>
              <Box>
                <h4>BHK:</h4>
                <TextField
                  id="outlined-select"
                  select
                  value={bhk}
                  variant="filled"
                  onChange={(e) => setBhk(e.target.value)}
                  sx={{ mb: 4, mr: 7 }}
                  size="small"
                >
                  {bhkOptions}
                </TextField>
              </Box>
              <Box>
                <h4>BATHROOM:</h4>
                <TextField
                  id="outlined-select"
                  select
                  value={bath}
                  variant="filled"
                  onChange={(e) => setBath(e.target.value)}
                  sx={{ mb: 4, mr: 11 }}
                  size="small"
                >
                  {bathOptions}
                </TextField>
              </Box>
              <Box>
                <h4>TYPE:</h4>
                <TextField
                  id="outlined-select"
                  select
                  value={type}
                  variant="filled"
                  onChange={(e) => setType(e.target.value)}
                  sx={{ mb: 4 }}
                  size="small"
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Box>

          {/* PROPERTY RULES */}
          <Box>
            <Bar props="PROPERTY RULES" />
            <Box sx={{ display: "flex" }} gap={4}>
              {rules.map((item) => (
                <ToggleButtonGroup
                  color="primary"
                  size="small"
                  exclusive
                  width={150}
                >
                  <center>
                    <h4>{item.value}</h4>
                    <ToggleButton
                      value="false"
                      sx={{ border: "none" }}
                      onClick={() => {
                        cancelledRulesHandler(item);
                      }}
                    >
                      {item.cancelled ? (
                        <CancelRoundedIcon sx={{ color: "red" }} />
                      ) : (
                        <CancelOutlinedIcon />
                      )}
                    </ToggleButton>
                    <ToggleButton
                      value="true"
                      sx={{ border: "none" }}
                      onClick={() => {
                        tickedRulesHandler(item);
                      }}
                    >
                      {item.ticked ? (
                        <CheckCircleRoundedIcon sx={{ color: "green" }} />
                      ) : (
                        <CheckCircleOutlineRoundedIcon />
                      )}
                    </ToggleButton>
                  </center>
                </ToggleButtonGroup>
              ))}
            </Box>
          </Box>

          {/* TENANT DETAILS */}
          <Box>
            <Bar props="AMENITIES" />
            <h4>NO OF TENANTS: </h4>
            <TextField
              variant="filled"
              required
              name="rent"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={tenantNo}
              onChange={(e) => setTenantNo(e.target.value)}
              sx={{ mb: 3, p: 0, width: "8%" }}
              id="outlined-size-small"
              size="small"
            />
            <Box>{tenantFields}</Box>
          </Box>

          {/* AMENITIES */}
          <Box>
            <Bar props="AMENITIES" />
            <Box sx={{ display: "flex" }} gap={2}>
              {amenities.map((item) => (
                <Button
                  key={item.id}
                  variant={item.variant}
                  onClick={() => {
                    amenityClickHandler(item);
                  }}
                  sx={{ border: "1px solid" }}
                >
                  {item.value}
                </Button>
              ))}
            </Box>
          </Box>

          {/* PREFERENCES */}
          <Box>
            <Bar props="PREFERENCES" />
            <Box>
              <TextField
                variant="filled"
                required
                name="preferences"
                type="text"
                value={preferenceItem}
                onChange={(e) => setPreferenceItem(e.target.value)}
                sx={{ mb: 3, p: 0, mr: 2, width: "20%" }}
                id="outlined-size-small"
                size="small"
              />
              <Button variant="contained" onClick={() => preferencesHandler()}>
                ADD
              </Button>
            </Box>
            <Box>
              {preferences.map((item) => (
                <Box sx={{ width: "30%" }}>
                  {item}
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => deletePreferencesHandler(item)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Property Images */}
          <Box>
            <Bar props="PROPERTY IMAGES" />
            <Box
              sx={{
                display: pics.length === 0 ? "none" : "initial",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Cover Image
              </Typography>
              <ImageList
                sx={{
                  width: "65%",
                  display: "grid",
                }}
              >
                <ImageListItem key={pics[0]}>
                  <img
                    src={pics[0]?.url}
                    srcSet={pics[0]?.url}
                    alt={pics[0]?.url}
                    loading="lazy"
                  />
                </ImageListItem>
              </ImageList>
            </Box>

            {pics.length === 0 ? (
              <label htmlFor="contained-button-image">
                <Input
                  accept="image/*"
                  id="contained-button-image"
                  multiple
                  type="file"
                  onChange={(event) => {
                    fileToDataUri(event.target.files[0]).then((dataUri) => {
                      setPics((coverPic) => [...coverPic, dataUri]);
                    });
                  }}
                />
                <Button variant="contained" component="span">
                  Add Cover Image
                </Button>
              </label>
            ) : (
              <>
                <br />
                <label htmlFor="contained-button-coverImage">
                  <Input
                    name="coverImage"
                    accept="image/*"
                    id="contained-button-coverImage"
                    multiple
                    type="file"
                    onChange={coverImageChangeHandler}
                  />
                  <Button variant="contained" component="span">
                    Change Cover Image
                  </Button>
                </label>
                <br />
                <br />
                <br />
                <ImageList
                  sx={{
                    width: "80%",
                    display: pics.length === 0 ? "none" : "grid",
                  }}
                  cols={3}
                  gap={14}
                >
                  {pics.map((item, i) => {
                    return (
                      <>
                        {i !== 0 && (
                          <ImageListItem key={item}>
                            <img
                              src={item?.url}
                              srcSet={item?.url}
                              alt={item?.url}
                              loading="lazy"
                            />
                          </ImageListItem>
                        )}
                      </>
                    );
                  })}
                </ImageList>
                <br />
                <label htmlFor="contained-button-moreImage">
                  <Input
                    name="moreImages"
                    accept="image/*"
                    id="contained-button-moreImage"
                    multiple
                    type="file"
                    onChange={picsInputHandler}
                  />
                  <Button variant="contained" component="span">
                    Add More Images
                  </Button>
                </label>
              </>
            )}
          </Box>

          {/* Property Rent */}
          <Box>
            <Bar props="PROPERTY RENT" />
            <h4>RENT PRICE: </h4>
            <TextField
              variant="filled"
              required
              name="rent"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              sx={{ mb: 3, p: 0, width: "10%" }}
              id="outlined-size-small"
              size="small"
            />
          </Box>
        </Box>
        {location.state.status == "post" ? (
          <Button
            type="submit"
            variant="contained"
            color="success"
            component="span"
            onClick={handleClickOpen}
          >
            Submit
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="success"
            component="span"
            onClick={handleClickOpen}
          >
            Update Post
          </Button>
        )}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Sure you want to Submit?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {location.state.status == "post" ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button onClick={handleUpdate}>Update</Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default RoomDetailsForm;
