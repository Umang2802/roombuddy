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
      align="center"
      sx={{
        px: 12,
        bgcolor: "#6177D4",
        top: "auto",
        bottom: 0,
      }}
    >
      <Typography variant="body2" sx={{ p: 2 }}>
        Copyright © 2022 roombuddy | All Rights Reserved
      </Typography>
    </AppBar>
  );
};

export default Footer;
