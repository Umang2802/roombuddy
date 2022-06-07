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
import { Grid } from "@mui/material";
import Findroommate from "../Assets/Findroommates.png";
import houseicon from "../Assets/houseicon.png";
import chaticon from "../Assets/chaticon.png";
import recomendationicon from "../Assets/recomendationicon.png";
const Home = () => {
  const featureditems = [
    backgroundimg1,
    backgroundimg1,
    backgroundimg1,
    backgroundimg1,
    backgroundimg1,
    backgroundimg1,
    backgroundimg1,
    backgroundimg1,
  ];
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
            <Box
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#323232",
                fontWeight: "900",
              }}
            >
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
        <Grid style={{ marginTop: ".1rem" }} container spacing={3}>
          {featureditems.map((item) => {
            return (
              <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                <FeatItems image={item}></FeatItems>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Container sx={{ mt: 10 }}>
        <Typography
          sx={{ fontWeight: "900", fontSize: "2rem", fontFamily: "Poppins" }}
        >
          FIND ROOMMATES
        </Typography>
        <Box sx={{ mt: 10 }}>
          <Grid container alignItems="center">
            <Grid
              item
              lg={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography width="50%">
                find the perfect match using our recommendations
              </Typography>
              <Button
                variant="outlined"
                size="medium"
                color="inherit"
                sx={{
                  background: "#6177D4",
                  border: "1px solid #6177D4",
                  borderRadius: "35px",
                  color: "white",
                  textTransform: "none",
                  mt: 3,
                  width: "50%",
                  padding: ".5rem 2rem",
                }}
              >
                Find Roommates
              </Button>
            </Grid>
            <Grid item lg={6}>
              <img src={Findroommate} alt="" />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container sx={{ mt: 10, ml: 0, mr: 0 }}>
        <Typography
          align="center"
          sx={{ fontWeight: "900", fontSize: "2rem", fontFamily: "Poppins" }}
        >
          WHY US?
        </Typography>
        <Container sx={{ mt: 5 }}>
          <Grid
            align="center"
            container
            alignItems="center"
            justifyContent="center"
          >
            <Grid item sm={4}>
              <Box
                sx={{
                  boxShadow: "0px 0px 76px -15px #D6DEFA",
                  borderRadius: "10px",
                  margin: "0 8rem",
                }}
              >
                <img style={{ padding: "1rem" }} src={houseicon} alt="" />
              </Box>
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 900 }}>
                Price prediction
              </Typography>
              <Typography>
                We give you an accurate prediction of house rent prices of your
                selected area.so that the next time you bargain you are
                confident!
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Box
                sx={{
                  boxShadow: "0px 0px 76px -15px #E5FFDC",
                  borderRadius: "10px",
                  margin: "0 8rem",
                }}
              >
                <img style={{ padding: "1rem" }} src={chaticon} alt="" />
              </Box>
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 900 }}>
                Secure Chat
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                }}
              >
                We give you an accurate prediction of house rent prices of your
                selected area.so that the next time you bargain you are
                confident!
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Box
                sx={{
                  boxShadow: "0px 0px 76px -15px #FFC5B3",
                  borderRadius: "10px",
                  margin: "0 8rem",
                }}
              >
                <img
                  style={{ padding: "1rem" }}
                  src={recomendationicon}
                  alt=""
                />
              </Box>
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 900 }}>
                Smart Recommendation
              </Typography>
              <Typography>
                We give you an accurate prediction of house rent prices of your
                selected area.so that the next time you bargain you are
                confident!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
