import React from "react";
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
          <Card elevation={0}>
            <CardMedia
              component="img"
              height="250"
              image={Map}
              alt="map"
            />
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
            Spacious rooms for rent with no deposit
          </Typography>
          <Button variant="contained">Rent: &nbsp;$22</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained">Predicted rent: &nbsp;$21</Button>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ py: 4, fontWeight: "bold" }}> 
            Property details
          </Typography>

        </Box>
      </Container>
    </>
  );
};

export default SingleRoom;
