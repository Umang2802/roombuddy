import {
  Button,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import Bar from "../Components/Bar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Components/Navbar/Navbar";
//import { postRoom } from "../Services";
import * as actionCreator from "../State/Actions/postroomAction";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import MuiAlert from "@mui/material/Alert";

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
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [bath, setBath] = useState(1);
  const [bhk, setBhk] = useState(1);
  const [type, setType] = useState("Flat");
  const [rules, setRules] = useState(rule);
  const [pics, setPics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [amenities, setAmenities] = useState(amenity);
  const [tenantNo, setTenantNo] = useState(1);
  const [tName, setTName] = useState("");
  const [tBio, setTBio] = useState("");
  const [tenantDetails, setTenantDetails] = useState([]);
  const [predictedRent, setPredictedRent] = useState("0");
  const [preferences, setPreferences] = useState([]);
  const [preferenceItem, setPreferenceItem] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onError = (errors) => {
    setErrorMessage("Please fill all fields correctly!");
    setOpenError(true);
    handleClose();
  };

  const onSubmit = (data) => {
    console.log(data);
    const amenitydata = [];
    for (let i = 0; i < amenities.length; i++) {
      if (amenities[i].onClick === true) {
        amenitydata.push(amenities[i].value);
      }
    }

    const roomdata = {
      name: data.name,
      address: data.address,
      description: data.desc,
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
      rentPrice: data.rent,
      images: pics,
      tenantDetails: tenantDetails,
    };
    console.log(roomdata);
    try {
      if (pics.length === 0) {
        throw "Cover Image is required";
      }
      dispatch(actionCreator.postRoomAction(roomdata));
      handleClose();
      setSuccessMessage("Room added successfully");
      setOpenSuccess(true);
    } catch (error) {
      handleClose();
      setErrorMessage(error);
      setOpenError(true);
    }
  };

  const valOptions = {
    name: {
      required: "Property name is required",
      minLength: {
        value: 5,
        message: "Property name must have atleast 5 characters",
      },
    },
    address: {
      required: "Property Address is required",
    },
    desc: {
      required: "Property Description is required",
      minLength: {
        value: 20,
        message: "Property description must have atlest 20 characters",
      },
    },
    rent: {
      required: "Property Rent is Required",
      min: {
        value: 200,
        message: "Rent must be above 200",
      },
    },
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };

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

  function tenantNoHandler(e) {
    if (Number(e.target.value) > 4) {
      setErrorMessage("Please enter value less than 5");
      setOpenError(true);
      setTenantNo(1);
    } else {
      setTenantNo(e.target.value);
    }
  }

  const tenantHandler = () => {
    if (tName === "" || tBio === " " || tName === " " || tBio === "") {
      setErrorMessage("Please fill in Tenant details");
      setOpenError(true);
    } else {
      setTenantDetails((prevTenant) => [
        ...prevTenant,
        {
          name: tName,
          bio: tBio,
        },
      ]);
      setTName("");
      setTBio("");
      setSuccessMessage("Tenant details added successfully");
      setOpenSuccess(true);
    }
  };

  const tenantFields = [];
  for (let i = 1; i <= tenantNo; i++) {
    tenantFields.push(<h4>TENANT {i} NAME: </h4>);
    tenantFields.push(
      <TextField
        hiddenLabel
        variant="filled"
        name="tenant"
        type="text"
        value={tenantDetails[i - 1]?.name}
        InputLabelProps={{ style: { fontSize: 12 } }}
        onChange={(e) => {
          setTName(e.target.value);
        }}
        sx={{ mb: 3, p: 0, width: "30%" }}
        size="small"
      />
    );
    tenantFields.push(<h4>TENANT {i} BIO: </h4>);
    tenantFields.push(
      <TextField
        name="tenantBio"
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
        Click to add tenant
      </Button>
    );
  }

  const preferencesHandler = () => {
    if (preferenceItem === "" || preferenceItem === " ") {
      setErrorMessage("Please enter your Preferences");
      setOpenError(true);
    } else {
      setPreferences((preference) => [...preference, preferenceItem]);
      setPreferenceItem("");
      setSuccessMessage("Preference added successfully");
      setOpenSuccess(true);
    }
  };

  const deletePreferencesHandler = (item) => {
    setPreferences(preferences.filter((preference) => preference !== item));
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
              autoFocus
              variant="filled"
              name="name"
              type="text"
              hiddenLabel
              {...register("name", valOptions.name)}
              sx={{ mb: 3, p: 0, width: "30%", height: "50%" }}
              size="small"
              error={Boolean(errors.name)}
              helperText={errors.name ? errors.name.message : ""}
            />
            <br />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              PROPERTY ADDRESS
            </Typography>
            <TextField
              hiddenLabel
              variant="filled"
              {...register("address", valOptions.address)}
              name="address"
              type="text"
              sx={{ mb: 4, p: 0, width: "30%" }}
              size="small"
              error={Boolean(errors.address)}
              helperText={errors.address ? errors.address.message : ""}
            />
          </Box>
          <Box>
            <Bar props="PROPERTY DETAILS" />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              PROPERTY DESCRIPTION
            </Typography>
            <TextField
              name="desc"
              multiline
              {...register("desc", valOptions.desc)}
              rows={3}
              variant="filled"
              sx={{ mb: 4, p: 0, width: "55%" }}
              size="small"
              error={Boolean(errors.desc)}
              helperText={errors.desc ? errors.desc.message : ""}
            />
            <br />
            <Box sx={{ display: "flex" }}>
              <Box>
                <h4>BHK:</h4>
                <TextField
                  hiddenLabel
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
                  hiddenLabel
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
                  hiddenLabel
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
              hiddenLabel
              variant="filled"
              required
              name="rent"
              type="number"
              InputProps={{ inputProps: { min: "1", max: "4", step: "1" } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={tenantNo}
              onChange={tenantNoHandler}
              sx={{ mb: 3, p: 0, width: "8%" }}
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
                hiddenLabel
                variant="filled"
                required
                name="preferences"
                type="text"
                value={preferenceItem}
                onChange={(e) => setPreferenceItem(e.target.value)}
                sx={{ mb: 3, p: 0, mr: 2, width: "20%" }}
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
              hiddenLabel
              variant="filled"
              name="rent"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              sx={{ mb: 3, p: 0, width: "20%" }}
              size="small"
              {...register("rent", valOptions.rent)}
              error={Boolean(errors.rent)}
              helperText={errors.rent ? errors.rent.message : ""}
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

        <Snackbar
          open={openError}
          autoHideDuration={5000}
          onClose={handleErrorClose}
        >
          <Alert
            onClose={handleErrorClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSuccess}
          autoHideDuration={4000}
          onClose={handleErrorClose}
        >
          <Alert
            onClose={handleErrorClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to Submit?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            {location.state.status == "post" ? (
              <Button onClick={handleSubmit(onSubmit, onError)}>Submit</Button>
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
