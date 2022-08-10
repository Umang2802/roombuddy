import React from "react";
import AppBar from "@mui/material/AppBar";
import { Divider, Grid, Typography } from "@mui/material";
import Logo from "../../Assets/logo_white.svg";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  const Ul = styled("ul")({
    listStyle: "none",
  });
  
  const Li = styled("li")({
    lineHeight: "2em",
  });

  return (
    <AppBar
      position="relative"
      sx={{
        px: 12,
        bgcolor: "#6177D4",
        top: "auto",
        bottom: 0,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: {md: 'space-between', sm: 'center', xs: 'center'},
          alignItems: "center",
          py: 5,
        }}
      >
        <Grid item md={3} sm={12}>
          <center>
            <img src={Logo} alt="img" loading="lazy" width="30%" />
            <Typography sx={{ pt: 2 }}>
              Finding rooms and roommates
              <br /> at the tip of your fingers
            </Typography>
          </center>
        </Grid>
        <Grid item md={1} sm={4} xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
            Company
          </Typography>
          <Ul>
            <Li>About</Li>
            <Li>Contact us</Li>
            <Li>Careers</Li>
            <Li>Culture</Li>
            <Li>Blog</Li>
          </Ul>
        </Grid>
        <Grid item md={1} sm={4} xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
            Company
          </Typography>
          <Ul>
            <Li>About</Li>
            <Li>Contact us</Li>
            <Li>Careers</Li>
            <Li>Culture</Li>
            <Li>Blog</Li>
          </Ul>
        </Grid>
        <Grid item md={1} sm={4} xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
            Company
          </Typography>
          <Ul>
            <Li>About</Li>
            <Li>Contact us</Li>
            <Li>Careers</Li>
            <Li>Culture</Li>
            <Li>Blog</Li>
          </Ul>
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <center>
            <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
              Connect with US
            </Typography>
            <FacebookIcon />
            &nbsp;
            <TwitterIcon />
            &nbsp;
            <InstagramIcon />
            &nbsp;
            <LinkedInIcon />
            &nbsp;
            <YouTubeIcon />
          </center>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: "white" }} />
      <Typography variant="body2" sx={{ p: 2 }}>
        Copyright © 2022 roombuddy | All Rights Reserved
      </Typography>
    </AppBar>
  );
};

export default Footer;
