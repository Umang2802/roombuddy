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
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

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
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("Prefer not to say");
  const [occupation, setOccupation] = useState();
  const [lookingForRoomIn, setLookingForRoomIn] = useState();
  const [lookingToMoveInFrom, setLookingToMoveInFrom] = useState();
  const [bhk, setBhk] = useState();
  const [budget, setBudget] = useState();
  const [preferences, setPreferences] = useState([]);
  const [preferenceItem, setPreferenceItem] = useState("");
  const [pics, setPics] = useState("");

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

  const dispatch = useDispatch();
  const bhkOptions = [];
  for (let i = 1; i <= 6; i++) {
    bhkOptions.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const preferencesHandler = () => {
    setPreferences((preference) => [...preference, preferenceItem]);
    setPreferenceItem("");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const roommatedata = {
      name: name,
      age: age,
      gender: gender,
      occupation: occupation,
      lookingForRoomIn: lookingForRoomIn,
      lookingToMoveIn: lookingToMoveInFrom,
      preferredSize: bhk,
      budget: budget,
      image: pics[0],
      preferences: preferences,
    };

    dispatch(actionCreator.postRoommateAction(roommatedata));
  };

  useEffect(() => {
    
  }, [])
  

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  variant="filled"
                  required
                  name="name"
                  type="text"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 3, p: 0, width: "70%" }}
                  id="outlined-size-small"
                  size="small"
                />
                <Typography sx={{ fontSize: 16, mb: 1 }}>AGE</Typography>
                <TextField
                  variant="filled"
                  required
                  name="age"
                  type="text"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  sx={{ mb: 3, p: 0, width: "20%" }}
                  id="outlined-size-small"
                  size="small"
                />
                <Typography sx={{ fontSize: 16, mb: 1 }}>GENDER</Typography>
                <TextField
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
                  variant="filled"
                  required
                  name="occupation"
                  type="text"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
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
              variant="filled"
              required
              name="lookingForRoomIn"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={lookingForRoomIn}
              onChange={(e) => setLookingForRoomIn(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              LOOKING TO MOVE IN FROM
            </Typography>
            <TextField
              variant="filled"
              required
              name="lookingToMoveInFrom"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={lookingToMoveInFrom}
              onChange={(e) => setLookingToMoveInFrom(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              PREFFERED SIZE OF ROOM{" "}
            </Typography>
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
            <Typography sx={{ fontSize: 16, mb: 1 }}>BUDGET</Typography>
            <TextField
              variant="filled"
              required
              name="budget"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
          </Box>
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
          <Button
            type="submit"
            variant="contained"
            color="success"
            component="span"
            onClick={handleClickOpen}
          >
            Submit
          </Button>
        </Box>
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
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ProfileDetailsForm;
