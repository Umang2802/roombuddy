import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Input,
  MenuItem,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Bar from "../Components/Bar";
import Navbar from "../Components/Navbar/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import * as actionCreator from "../State/Actions/postroomAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import MuiAlert from "@mui/material/Alert";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

const genderOptions = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
  {
    value: "Prefer not to say",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDetailsForm = () => {
  const location = useLocation();
  console.log(location);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("Prefer not to say");
  const [bhk, setBhk] = useState(1);
  const [preferences, setPreferences] = useState([]);
  const [preferenceItem, setPreferenceItem] = useState("");
  const [open, setOpen] = useState(false);
  const [pics, setPics] = useState("");
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const Input = styled("input")({
    display: "none",
  });

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };

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

  const valOptions = {
    name: {
      required: "Name is required",
      minLength: {
        value: 5,
        message: "Name must have atleast 5 characters",
      },
    },
    age: {
      required: "Age is required",
      min: {
        value: 10,
        message: "Age should be above 10",
      },
      max: {
        value: 79,
        message: "Age should be less than 80",
      },
    },
    occupation: {
      required: "Occupation is required",
    },
    lookingForRoomIn: {
      required: "Room location is required",
    },
    lookingToMoveInFrom: {
      required: "Location is required",
    },
    budget: {
      required: "Budget is Required",
      min: {
        value: 200,
        message: "Budget must be above 200",
      },
    },
  };

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

  const onSubmit = (data) => {
    const roommatedata = {
      name: data.name,
      age: data.age,
      gender: gender,
      occupation: data.occupation,
      lookingForRoomIn: data.lookingForRoomIn,
      lookingToMoveIn: data.lookingToMoveInFrom,
      preferredSize: bhk,
      budget: data.budget,
      image: pics[0],
      preferences: preferences,
    };

    try {
      if (pics.length === 0) {
        throw "Profile image is required";
      }
      dispatch(actionCreator.postRoommateAction(roommatedata));
      handleClose();
      setSuccessMessage("Profile added successfully");
      setOpenSuccess(true);
    } catch (error) {
      handleClose();
      setErrorMessage(error);
      setOpenError(true);
    }
  };

  useEffect(() => {
    // if (location.state.status == "edit") {
    //   const data = location.state.payload;
    //   setName(data.name);
    //   setAge(data.age);
    //   setGender(data.gender);
    //   setOccupation(data.occupation);
    //   setLookingForRoomIn(data.lookingForRoomIn);
    //   setLookingToMoveInFrom(data.lookingToMoveIn);
    //   setBhk(data.preferredSize);
    //   setBudget(data.budget);
    //   setPics(data.image);
    //   setPreferences(data.preferences);
    // } else {
    //   console.log("false");
    // }
  }, []);

  const handleUpdate = async (event) => {
    // try {
    //   event.preventDefault();
    //   const roommatedata = {
    //     roommateProfileId: location.state.id,
    //     name: name,
    //     age: age,
    //     gender: gender,
    //     occupation: occupation,
    //     lookingForRoomIn: lookingForRoomIn,
    //     lookingToMoveIn: lookingToMoveInFrom,
    //     preferredSize: bhk,
    //     budget: budget,
    //     image: pics[0],
    //     preferences: preferences,
    //     roomId: location.state.id,
    //     userId: location.state.payload.user,
    //   };
    //   const usertoken = JSON.parse(localStorage.getItem("token"));
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${usertoken}`,
    //     },
    //   };
    //   axios
    //     .post("/roommateprofiles/updateRoommateProfile", roommatedata, config)
    //     .then((res) => {
    //       console.log(res.data);
    //     });
    //   console.log("working");
    // } catch (e) {
    //   console.log(e);
    // }
    // console.log("updated post");
  };
  const onError = (errors) => {
    setErrorMessage("Please fill all fields correctly!");
    setOpenError(true);
    handleClose();
  };
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", py: 1 }}>
            Room Details
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            Choose the options which match your personality. It will take a
            couple of minutes.
          </Typography>
          <Box>
            <Bar props="BIO" />
            <Grid container spacing={1}>
              <Grid item md={6} sm={1} xs={1}>
                <Typography sx={{ fontSize: 16, mb: 1 }}>NAME</Typography>
                <TextField
                  hiddenLabel
                  variant="filled"
                  name="name"
                  type="text"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  {...register("name", valOptions.name)}
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name.message : ""}
                  sx={{ mb: 3, p: 0, width: "70%" }}
                  size="small"
                />
                <Typography sx={{ fontSize: 16, mb: 1 }}>AGE</Typography>
                <TextField
                  hiddenLabel
                  variant="filled"
                  name="age"
                  type="number"
                  InputProps={{
                    inputProps: { min: "10", max: "79", step: "1" },
                  }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  {...register("age", valOptions.age)}
                  error={Boolean(errors.age)}
                  helperText={errors.age ? errors.age.message : ""}
                  sx={{ mb: 3, p: 0, width: "30%" }}
                  size="small"
                />
                <Typography sx={{ fontSize: 16, mb: 1 }}>GENDER</Typography>
                <TextField
                  hiddenLabel
                  id="outlined-select"
                  select
                  value={gender}
                  variant="filled"
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ mb: 4, mr: 7 }}
                  size="small"
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography sx={{ fontSize: 16, mb: 1 }}>OCCUPATION</Typography>
                <TextField
                  hiddenLabel
                  variant="filled"
                  required
                  name="occupation"
                  type="text"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  {...register("occupation", valOptions.occupation)}
                  error={Boolean(errors.occupation)}
                  helperText={
                    errors.occupation ? errors.occupation.message : ""
                  }
                  sx={{ mb: 3, p: 0, width: "70%" }}
                  id="outlined-size-small"
                  size="small"
                />
              </Grid>

              <Grid item md={3} sm={1} xs={1}>
                <center>
                  {pics === "" ? (
                    <>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fuser-2%2F100%2F10-512.png&f=1&nofb=1"
                        sx={{ width: 180, height: 180 }}
                      />
                      <br />
                      <label htmlFor="contained-button-image">
                        <Input
                          accept="image/*"
                          id="contained-button-image"
                          multiple
                          type="file"
                          onChange={(event) => {
                            fileToDataUri(event.target.files[0]).then(
                              (dataUri) => {
                                setPics((coverPic) => [...coverPic, dataUri]);
                              }
                            );
                          }}
                        />
                        <Button variant="contained" component="span">
                          Add Profile Picture
                        </Button>
                      </label>
                    </>
                  ) : (
                    <>
                      <Avatar
                        alt="Remy Sharp"
                        src={pics[0]}
                        sx={{ width: 180, height: 180 }}
                      />
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
                          Change Profile Picture
                        </Button>
                      </label>
                    </>
                  )}
                </center>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Bar props="ROOM FOR SEARCH" />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              LOOKING FOR ROOM IN
            </Typography>
            <TextField
              hiddenLabel
              variant="filled"
              required
              name="lookingForRoomIn"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              {...register("lookingForRoomIn", valOptions.lookingForRoomIn)}
              error={Boolean(errors.lookingForRoomIn)}
              helperText={
                errors.lookingForRoomIn ? errors.lookingForRoomIn.message : ""
              }
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              LOOKING TO MOVE IN FROM
            </Typography>
            <TextField
              hiddenLabel
              variant="filled"
              required
              name="lookingToMoveInFrom"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              {...register(
                "lookingToMoveInFrom",
                valOptions.lookingToMoveInFrom
              )}
              error={Boolean(errors.lookingToMoveInFrom)}
              helperText={
                errors.lookingToMoveInFrom
                  ? errors.lookingToMoveInFrom.message
                  : ""
              }
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              PREFFERED SIZE OF ROOM{" "}
            </Typography>
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
            <Typography sx={{ fontSize: 16, mb: 1 }}>BUDGET</Typography>
            <TextField
              hiddenLabel
              variant="filled"
              required
              name="budget"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              {...register("budget", valOptions.budget)}
              error={Boolean(errors.budget)}
              helperText={errors.budget ? errors.budget.message : ""}
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
          </Box>
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
        </Box>
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

export default ProfileDetailsForm;
