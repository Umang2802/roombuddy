import { Container, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const bathroom = [
  {
    value: "0",
  },
  {
    value: "1",
  },
  {
    value: "2",
  },
  {
    value: "3",
  },
  {
    value: "4",
  },
  {
    value: "5",
  },
  {
    value: "6",
  },
];

const bhks = [
  {
    value: "0",
  },
  {
    value: "1",
  },
  {
    value: "2",
  },
  {
    value: "3",
  },
  {
    value: "4",
  },
  {
    value: "5",
  },
  {
    value: "6",
  },
];

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

const RoomDetailsForm = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [bath, setBath] = useState("0");
  const [bhk, setBhk] = useState("0");
  const [type, setType] = useState("Flat");
  const [smoking, setSmoking] = useState("right");

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", py: 1 }}>
          Post Details
        </Typography>
        <Typography sx={{ fontSize: 16 }}>
          Choose the options which match your personality. It will take a couple
          of minutes.
        </Typography>
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            PROPERTY ADDRESS
          </Box>
          <Typography sx={{ fontSize: 16, mb: 1 }}>PROPERTY NAME</Typography>
          <TextField
            variant="filled"
            required
            name="name"
            type="text"
            autoFocus
            InputLabelProps={{ style: { fontSize: 12 } }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3, p: 0, width: "30%" }}
            id="outlined-size-small"
            size="small"
          />
          <Typography sx={{ fontSize: 16, mb: 1 }}>PROPERTY ADDRESS</Typography>
          <TextField
            variant="filled"
            required
            name="address"
            type="text"
            id="text"
            autoFocus
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 4, p: 0, width: "30%" }}
            size="small"
          />
        </Box>
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            PROPERTY DETAILS
          </Box>
          <Typography sx={{ fontSize: 16, mb: 1 }}>
            PROPERTY DESCRIPTION
          </Typography>
          <TextField
            id="filled-multiline-static"
            multiline
            rows={3}
            variant="filled"
            sx={{ mb: 4, p: 0, width: "55%" }}
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
                {bhks.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
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
                {bathroom.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
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
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            PROPERTY RULES
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              size="small"
              value={smoking}
              exclusive
              onChange={(e) => setSmoking(e.target.value)}
              aria-label="text alignment"
              width={150}
            >
              <center>
                <h4>SMOKING</h4>

                <ToggleButton value="yes" sx={{ border: "none" }}>
                  <CheckCircleRoundedIcon sx={{ color: "green" }} />
                </ToggleButton>
                <ToggleButton value="no" sx={{ border: "none" }}>
                  <CancelRoundedIcon sx={{ color: "red" }} />
                </ToggleButton>
              </center>
            </Box>
            <Box
              size="small"
              value={smoking}
              exclusive
              onChange={(e) => setSmoking(e.target.value)}
              aria-label="text alignment"
              width={150}
            >
              <center>
                <h4>ALCOHOL</h4>

                <ToggleButton value="yes" sx={{ border: "none" }}>
                  <CheckCircleRoundedIcon sx={{ color: "green" }} />
                </ToggleButton>
                <ToggleButton value="no" sx={{ border: "none" }}>
                  <CancelRoundedIcon sx={{ color: "red" }} />
                </ToggleButton>
              </center>
            </Box>
            <Box
              size="small"
              value={smoking}
              exclusive
              onChange={(e) => setSmoking(e.target.value)}
              aria-label="text alignment"
              width={150}
            >
              <center>
                <h4>PETS</h4>

                <ToggleButton value="yes" sx={{ border: "none" }}>
                  <CheckCircleRoundedIcon sx={{ color: "green" }} />
                </ToggleButton>
                <ToggleButton value="no" sx={{ border: "none" }}>
                  <CancelRoundedIcon sx={{ color: "red" }} />
                </ToggleButton>
              </center>
            </Box>
            <Box
              size="small"
              value={smoking}
              exclusive
              onChange={(e) => setSmoking(e.target.value)}
              aria-label="text alignment"
              width={150}
            >
              <center>
                <h4>VEGETARIAN</h4>

                <ToggleButton value="yes" sx={{ border: "none" }}>
                  <CheckCircleRoundedIcon sx={{ color: "green" }} />
                </ToggleButton>
                <ToggleButton value="no" sx={{ border: "none" }}>
                  <CancelRoundedIcon sx={{ color: "red" }} />
                </ToggleButton>
              </center>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            TENANT DETAILS
          </Box>
        </Box>
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            AMENITIES
          </Box>
        </Box>
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            PREFERENCES
          </Box>
        </Box>
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            PROPERTY IMAGES
          </Box>
        </Box>
        <Box>
          <Box
            maxWidth="lg"
            sx={{
              bgcolor: "#515151",
              color: "white",
              p: 1,
              fontWeight: "bold",
              borderRadius: "4px",
              my: 3,
              pl: 2,
              width: "80%",
            }}
          >
            PROPERTY RENT
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RoomDetailsForm;
