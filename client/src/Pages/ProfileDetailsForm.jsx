import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Bar from "../Components/Bar";
import Navbar from "../Components/Navbar/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileDetailsForm = () => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [occupation, setOccupation] = useState();
  const [lookingForRoomIn, setLookingForRoomIn] = useState();
  const [lookingToMoveInFrom, setLookingToMoveInFrom] = useState();
  const [bhk, setBhk] = useState();
  const [budget, setBudget] = useState();
  const [preferences, setPreferences] = useState([]);
  const [preferenceItem, setPreferenceItem] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
            <Typography sx={{ fontSize: 16, mb: 1 }}>NAME</Typography>
            <TextField
              variant="filled"
              required
              name="name"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%" }}
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
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
            <Typography sx={{ fontSize: 16, mb: 1 }}>GENDER</Typography>
            <TextField
              variant="filled"
              required
              name="gender"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
            <Typography sx={{ fontSize: 16, mb: 1 }}>OCCUPATION</Typography>
            <TextField
              variant="filled"
              required
              name="occupation"
              type="text"
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
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
        </Box>
      </Container>
    </>
  );
};

export default ProfileDetailsForm;
