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
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Navbar from "../Components/Navbar/Navbar";

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
    variant: "outlined",
    onClick: false,
    value: "AC",
  },
  {
    id: 1,
    variant: "outlined",
    onClick: false,
    value: "Pool",
  },
  {
    id: 2,
    variant: "outlined",
    onClick: false,
    value: "Dining Area",
  },
  {
    id: 3,
    variant: "outlined",
    onClick: false,
    value: "Parking Area",
  },
  {
    id: 4,
    variant: "outlined",
    onClick: false,
    value: "Garden",
  },
  {
    id: 5,
    variant: "outlined",
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

const RoomDetailsForm = () => {
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
   const [predictedRent, setPredictedRent] = useState("0");
   const [tName, setTName] = useState("");
   const [tBio, setTBio] = useState("");
   const [tenantDetails, setTenantDetails] = useState([
     { tenantName: " ", tenantBio: " " },
   ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const Input = styled("input")({
    display: "none",
  });

  const bhkOptions = []
  for (let i = 1; i <= tenantNo; i++) {
    bhkOptions.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  
  const bathOptions = [];
  for (let i = 1; i <= tenantNo; i++) {
    bathOptions.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const tickedRulesHandler = (item) => {
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
      const newArray = pics.map((v, i) => {
        if (i === 0) return dataUri;
        return v;
      });
      setPics(newArray);
    });
  };

    const amenityClickHandler = (item) => {
      setAmenities(
        amenities.map((amenity) =>
          amenity.id === item.id
            ? amenity.onClick === true ? {
                ...amenity,
                variant: "outlined",
                onClick: false,
              } : {
                ...amenity,
                variant: "contained",
                onClick: true,
              }
            : { ...amenity }
        )
      );
    };

  // const tenants = () => {
  //   setTenantDetails((prevTenant) => [
  //     ...prevTenant,
  //     {
  //       tenantName: tName,
  //       tenantBio: tBio,
  //     },
  //   ]);
  // };

  // const tenant = [{ tName: " ", tBio: " " }];

  const tenantFields = [];
  for (let i = 1; i <= tenantNo; i++) {
    tenantFields.push(<h4>TENANT {i} NAME: </h4>);
    tenantFields.push(
      <TextField
        variant="filled"
        required
        name="tenant"
        type="text"
        InputLabelProps={{ style: { fontSize: 12 } }}
        //value={tenantDetails.tenantName}
        //onChange={(e) => {
        //  setTName(e.target.value);
        //}}
        sx={{ mb: 3, p: 0, width: "30%" }}
        id="outlined-size-small"
      />
    );
    tenantFields.push(<h4>TENANT {i} BIO: </h4>);
    tenantFields.push(
      <TextField
        id="filled-multiline-static"
        multiline
        //value={tenantDetails.tenantBio}
        // onChange={(e) => {
        //             setTBio(e.target.value);
        //             tenants();
        // }}
        rows={3}
        variant="filled"
        sx={{ mb: 4, p: 0, width: "55%" }}
      />
    );
  }

  useEffect(() => {
    // console.log(`Tname: ${tName}`);
    // console.log(`TBio: ${tBio}`);
    // console.log(tenantDetails)
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
                  </center>
                </ToggleButtonGroup>
              ))}
            </Box>
          </Box>

          {/* TENANT DETAILS */}
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
            <Box>{tenantFields}</Box>
          </Box>

          {/* AMENITIES */}
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
            <Box sx={{ display: "flex" }} gap={2}>
              {amenities.map((item) => (
                <Button
                  key={item.id}
                  variant={item.variant}
                  onClick={() => {
                    amenityClickHandler(item);
                  }}
                >
                  {item.value}
                </Button>
              ))}
            </Box>
          </Box>

          {/* PREFERENCES */}
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

          {/* Property Images */}
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
                    src={pics[0]}
                    srcSet={pics[0]}
                    alt={pics[0]}
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
                  {pics.map((item) => (
                    <ImageListItem key={item}>
                      <img src={item} srcSet={item} alt={item} loading="lazy" />
                    </ImageListItem>
                  ))}
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
