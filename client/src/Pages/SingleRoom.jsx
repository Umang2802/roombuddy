import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";
import RoomImage from "../Assets/room.jpg";
import Map from "../Assets/map.jpg";

const SingleRoom = () => {
const [name,setName] = useState();
const [desc, setDesc] = useState();
const [bhk, setBhk] = useState();
const [bath, setBath] = useState();
const [type, setType] = useState();
const [tenantNo, setTenantNo] = useState();

const items = [];
  for (let i=1;i<=tenantNo;i++) {
    items.push(<h4>TENANT {i} NAME: </h4>);
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Card>
            <CardMedia
              component="img"
              height="350"
              image={RoomImage}
              alt="room"
            />
          </Card>
          <Card elevation={0} sx={{ display: { xs: "none", md: "initial" } }}>
            <CardMedia component="img" height="250" image={Map} alt="map" />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="caption">
                5316 Tinker St, Boise, Illinois, United States
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ py: 4 }}>
            Spacious rooms for rent with no deposit {name}
          </Typography>
          <Button
            variant="contained"
            sx={{ cursor: "default", bgcolor: "#6177D4" }}
          >
            Rent: &nbsp;$22
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            sx={{ cursor: "default", bgcolor: "#6177D4" }}
          >
            Predicted rent: &nbsp;$21
          </Button>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ pt: 4, fontWeight: "bold" }}>
            Property details
          </Typography>
          <Typography variant="body1" sx={{ py: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel {desc}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default SingleRoom;
