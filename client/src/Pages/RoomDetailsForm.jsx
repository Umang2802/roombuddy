import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Navbar from "../Components/Navbar/Navbar";

const bathroom = [
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

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

const RoomDetailsForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [bath, setBath] = useState(1);
  const [bhk, setBhk] = useState(1);
  const [type, setType] = useState("Flat");
  const [smoking, setSmoking] = useState("true");
  const [pics, setPics] = useState([]);
  const [rent, setRent] = useState("0");
  const [predictedRent, setPredictedRent] = useState("0");
  const [tenantNo, setTenantNo] = useState(1);
  const [selected, setSelected] = useState(false);
  const [tenantDetails, setTenantDetails] = useState([
    {tenantName: "",
    tenantBio: "",}
  ]);
  const [desc, setDesc] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const Input = styled("input")({
    display: "none",
  });

  const picsInputHandler = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      fileToDataUri(e.target.files[i]).then((dataUri) => {
        setPics((prevPics) => [...prevPics, dataUri]);
      });
    }
  };

  const items = [];
  for (let i=1;i<=tenantNo;i++) {
    items.push(<h4>TENANT {i} NAME: </h4>);
    items.push(
      <TextField
        variant="filled"
        required
        name="tenant"
        type="text"
        InputLabelProps={{ style: { fontSize: 12 } }}
        // value={tenantDetails[i].tenantName}
        // onChange={(e) => setTenantDetails.tenantName(e.target.value)}
        sx={{ mb: 3, p: 0, width: "30%" }}
        id="outlined-size-small"
      />
    );
    items.push(<h4>TENANT {i} BIO: </h4>);
    items.push(
      <TextField
        id="filled-multiline-static"
        multiline
        // value={tenantDetails[i].tenantBio}
        // onChange={(e) => setTenantDetails.tenantBio(e.target.value)}
        rows={3}
        variant="filled"
        sx={{ mb: 4, p: 0, width: "55%" }}
      />
    );
  }

  useEffect(() => {
    console.log(tenantDetails);
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", py: 1 }}>
            Post Details
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            Choose the options which match your personality. It will take a
            couple of minutes.
          </Typography>
          <Box>
            <Box
              maxWidth="lg"
              sx={{
                bgcolor: "#6177D4",
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
              InputLabelProps={{ style: { fontSize: 12 } }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3, p: 0, width: "30%" }}
              id="outlined-size-small"
              size="small"
            />
            <Typography sx={{ fontSize: 16, mb: 1 }}>
              PROPERTY ADDRESS
            </Typography>
            <TextField
              variant="filled"
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
            <Box
              maxWidth="lg"
              sx={{
                bgcolor: "#6177D4",
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
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
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
                bgcolor: "#6177D4",
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
              <ToggleButtonGroup
                color="primary"
                size="small"
                value={smoking}
                exclusive
                onChange={(e) => setSmoking(e.target.value)}
                width={150}
              >
                <center>
                  <h4>SMOKING</h4>

                  <ToggleButton value="true" sx={{ border: "none" }}>
                    <CheckCircleRoundedIcon sx={{ color: "green" }} />
                  </ToggleButton>
                  <ToggleButton value="false" sx={{ border: "none" }}>
                    <CancelRoundedIcon sx={{ color: "red" }} />
                  </ToggleButton>
                </center>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                size="small"
                value={smoking}
                exclusive
                // onChange={(e) => setSmoking(e.target.value)}
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
              </ToggleButtonGroup>
              <ToggleButtonGroup
                size="small"
                value={smoking}
                exclusive
                //onChange={(e) => setSmoking(e.target.value)}
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
              </ToggleButtonGroup>
              <ToggleButtonGroup
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
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box>
            <Box
              maxWidth="lg"
              sx={{
                bgcolor: "#6177D4",
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
            />
            <Box>{items}</Box>
          </Box>

          <Box>
            <Box
              maxWidth="lg"
              sx={{
                bgcolor: "#6177D4",
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
            <Button
              variant={selected ? "contained" : "outlined"}
              onClick={(e) => {
                setSelected(true);
              }}
            >
              Contained
            </Button>
            <Button
              variant={selected ? "contained" : "outlined"}
              onClick={(e) => {
                setSelected(true);
              }}
            >
              Contained
            </Button>
          </Box>
          <Box>
            <Box
              maxWidth="lg"
              sx={{
                bgcolor: "#6177D4",
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
                bgcolor: "#6177D4",
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
            <ImageList
              sx={{
                width: "80%",
                display: pics.length === 0 ? "none" : "grid",
              }}
              cols={3}
              gap={14}
            >
              {pics.map((item) => (
                <ImageListItem key={item}>
                  <img src={item} srcSet={item} alt={item} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>

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
                  Add Cover Images
                </Button>
              </label>
            ) : (
              <>
                <br />
                <label htmlFor="contained-button-image">
                  <Input
                    accept="image/*"
                    id="contained-button-image"
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
          <Box>
            <Box
              maxWidth="lg"
              sx={{
                bgcolor: "#6177D4",
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
            />
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="success"
          component="span"
        >
          Submit
        </Button>
      </Container>
    </>
  );
};

export default RoomDetailsForm;
