import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "black",
  backgroundColor: "white",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function RoommateAppbar({ handleChange, personalitycheck }) {
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user_id"));

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#90A9FC" }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search location....."
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button onClick={personalitycheck} sx={{ bgcolor: "white", mr: 2 }}>
              Recommend Roommates
            </Button>
            <Button
              sx={{ bgcolor: "white", mr: 2 }}
              onClick={() => {
                if (user === null || user === undefined) {
                  setErrorMessage("You need to Login first to post a Profile");
                  setOpenError(true);
                } else {
                  navigate("/profileDetailsForm", {
                    state: {
                      status: "post",
                    },
                  });
                }
              }}
            >
              Post Profile
            </Button>
            <Button sx={{ bgcolor: "white", mr: 2 }}>Filters</Button>
            <Button sx={{ bgcolor: "white", mr: 2 }}>Sort</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
