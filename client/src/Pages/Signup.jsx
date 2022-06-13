import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "@mui/system";
import logo from "../Assets/logo.png";
import bck from "../Assets/loginbackgnd.png";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as actionCreator from "../State/Actions/authaction";
import { GoogleLogin } from "@react-oauth/google";
import jwt from "jwt-decode";
const theme = createTheme();
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

const validationSchema = yup.object({
  username: yup
    .string("Enter your username")
    .min(4, "Username should be of minimum 4 characters length")
    .required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const Signup = () => {
  const dispatch = useDispatch();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const googleSuccess = async (res) => {
    const userdata = jwt(res.credential);
    setName(userdata.name);
    setEmail(userdata.email);
    await console.log("success");
  };

  const googleFailure = async (error) => {
    await console.log(error);
    await console.log("failed");
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(actionCreator.signUp(values));
    },
  });

  const tokentest = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("username"));

      const config = {
        headers: {
          Authorization: `Bearer ${usertoken.token}`,
        },
      };
      axios
        .get("/rooms/6294e688889a2eb621b20cb8", config)
        .then((res) => {
          console.log("response", res);
        })
        .catch((err) => {
          console.log("Error", err);
        });

      console.log("working");
    } catch (e) {
      console.log(e);
    }
  };
  const roomsdetails = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("username"));

      const config = {
        headers: {
          Authorization: `Bearer ${usertoken.token}`,
        },
      };
      const { data } = await axios.get("/rooms", config);

      console.log(data);

      console.log("working");
    } catch (e) {
      console.log(e);
    }
  };
  const classes = useStyles();

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
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
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
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                InputLabelProps={{ style: { fontSize: 15 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputLabelProps={{ style: { fontSize: 15 } }}
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
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputLabelProps={{ style: { fontSize: 15 } }}
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
                Create Account
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
              Already have an account? Login to find your perfect roombuddy
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={roomsdetails}
              sx={{
                mt: 3,
                mb: 2,
                background: "white",
                color: "#90A9FC",
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Login
            </Button>
          </Container>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 3, mb: 3 }} />
    </div>
    // </Container>
  );
};

export default Signup;
