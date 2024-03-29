import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../Assets/logo.png";
import bck from "../Assets/loginbackgnd.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actionCreator from "../State/Actions/authaction";
import { GoogleLogin } from "@react-oauth/google";
import jwt from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  maindiv: {
    display: "grid",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
    background: "#EEF2FF",
  },
  loginsubmit: {
    background: "linear-gradient(94.94deg, #6177D4 18.75%, #8298F4 98.3%)",
    color: "white",
  },

  login2: {
    background: "#90A9FC",
    padding: "2rem",
  },

  logindetails: {
    background: "white",
    padding: "8% 13% 8% 13%",
  },
  signupbtn: {
    background: "white",
    borderRadius: "2px",
    color: "#90A9Fw",
  },
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        RoomBuddy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const googleSuccess = async (res) => {
    const userdata = jwt(res.credential);
    const params = {
      name: userdata.name,
      email: userdata.email,
      imageURL: userdata.picture,
      password: userdata.email,
      bio: "",
      type: "googlelogin",
    };
    setOpen(true);
    dispatch(actionCreator.LoginAction(params, navigate));
  };

  const googleFailure = async (error) => {
    await console.log(error);
    await console.log("failed");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const params = {
      name: name,
      email: email,
      password: password,
      image: "",
      bio: "",
      type: "normallogin",
    };
    dispatch(actionCreator.LoginAction(params, navigate));
    }
    catch(error) {
      //console.log(error);
    }
  };

  return (
    <div className={classes.maindiv}>
      <img
        src={bck}
        alt="design"
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          width: "100%",
          zIndex: 0,
        }}
      />
      <Grid container sx={{ mt: 3, zIndex: 1 }} spacing={0} maxWidth="md">
        <Grid className={classes.logindetails} item xs={12} sm={7}>
          <Box
            sx={{
              display: "flex",
              background: "white",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" style={{ fontWeight: "900" }}>
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="text"
                autoComplete="email"
                autoFocus
                InputLabelProps={{ style: { fontSize: 15 } }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputLabelProps={{ style: { fontSize: 15 } }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ style: { fontSize: 15 } }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
                className={classes.loginsubmit}
              >
                Login
              </Button>
            </Box>
            <Typography>or</Typography>
            <GoogleLogin
              buttonText="Log in with Google"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
              size="large"
              width="300"
            />
          </Box>
        </Grid>
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={classes.login2}
          item
          xs={12}
          sm={5}
        >
          <Container align="center">
            <img src={logo} alt="" />
            <Typography
              mt={2}
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "ligh",
              }}
            >
              New here? Sign up to find your perfect roombuddy
            </Typography>
            <Button
              onClick={() => navigate("/signup")}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "white",
                color: "#90A9FC",
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Sign up
            </Button>
          </Container>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Copyright sx={{ mt: 3, mb: 3 }} />
    </div>
  );
}
