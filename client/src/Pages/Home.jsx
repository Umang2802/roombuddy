import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ReactComponent as LineSvg } from "../Assets/line.svg";
import { ReactComponent as BlockSvg } from "../Assets/block.svg";
import { ReactComponent as Backgroundimg } from "../Assets/background.svg";
import { ReactComponent as Backgroundbuilding } from "../Assets/buildingsbck.svg";
import FeatItems from "../Components/FeaturedItems/FeaturedItems.jsx";
import backgroundimg1 from "../Assets/background.svg";
import Navbar from "../Components/Navbar/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Backgroundimg style={{ position: "absolute" }}></Backgroundimg>
      <Backgroundbuilding
        style={{ position: "absolute", bottom: 0 }}
      ></Backgroundbuilding>
      <Container sx={{ mt: 4, mx: 7, height: "100vh" }}>
        <Box sx={{ height: "50vh", p: 5 }}>
          <Typography variant="h1" component="h2">
            <Box sx={{ fontFamily: "Poppins, sans-serif", color: "#323232" }}>
              ROOMBUDDY
            </Box>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Box
              sx={{
                fontSize: 20,
                fontFamily: "Montserrat, sans-serif",
                m: 0.5,
                width: 500,
              }}
            >
              Find rooms and roommates at the tip of your fingers!
            </Box>
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="inherit"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: "#6177D4",
              border: "1px solid #6177D4",
              borderRadius: "35px",
              color: "white",
              textTransform: "none",
              mt: 3,
              padding: ".5rem 2rem",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
      <Container>
        <Typography
          align="center"
          sx={{ fontWeight: "900", fontSize: "2rem", fontFamily: "Poppins" }}
        >
          FEATURED LOCATIONS
        </Typography>
        <FeatItems image={backgroundimg1}></FeatItems>
      </Container>
    </div>
  );
};

export default Home;
