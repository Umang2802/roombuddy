import { MenuItems } from "./MenuItems";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Logo from "../../Assets/logo.svg";
import { useSelector } from "react-redux";
import * as actionCreator from "../../State/Actions/authaction";
import { useDispatch } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const userdata = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [uname, setUname] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    if (userdata) {
      setShow(false);
      setUname(userdata);
    }
  }, [show, userdata]);
  const handleLogout = () => {
    dispatch(actionCreator.logout());
  };
  return (
    <AppBar
      style={{ background: "#EEF2FF", boxShadow: "none" }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* xs */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, my: 3 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setState(true)}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={state} onClose={() => setState(false)}>
            <Box
              sx={{
                width: 200,
              }}
              role="presentation"
              onClick={() => setState(false)}
              onKeyDown={() => setState(false)}
            >
              <List>
                {MenuItems.map((text, index) => (
                  <ListItem key={index}>
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? {
                              borderBottom: "3px solid green",
                              textDecoration: "none",
                              color: "black",
                              fontFamily: "Inter, sans-serif",
                            }
                          : {
                              borderBottom: "0",
                              textDecoration: "none",
                              color: "black",
                              fontFamily: "Inter, sans-serif",
                            }
                      }
                      to={text.link}
                    >
                      <ListItemButton>
                        <ListItemText primary={text.name} />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          <Box
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Link to="/">
              <img src={Logo} alt="img" loading="lazy" width="100%" />
            </Link>
          </Box>

          {/* md */}
          <Box
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link to="/">
              <img src={Logo} alt="img" loading="lazy" width="80%" />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {MenuItems.map((page, index) => (
              <Button
                key={index}
                sx={{
                  my: 2,
                  mx: 3,
                  display: "block",
                  fontSize: 16,
                  color: "#434343",
                  textTransform: "capitalize",
                  fontFamily: "Inter, sans-serif",
                }}
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid green",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                      }
                    : { borderBottom: "0" }
                }
                component={NavLink}
                to={page.link}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {show ? (
              <Button
                sx={{
                  my: 2,
                  mx: 3,
                  display: "block",
                  fontSize: 15,
                  color: "#434343",
                  fontFamily: "Inter, sans-serif",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            ) : (
              <>
                <IconButton sx={{ p: 0, borderRadius: "4px" }}>
                  <Typography
                    sx={{
                      mx: 1,
                      display: "block",
                      fontSize: 16,
                      color: "#434343",
                      textTransform: "capitalize",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {uname}
                  </Typography>
                  <Avatar
                    sx={{ fontSize: "10", width: 24, height: 24 }}
                    alt="User"
                  ></Avatar>
                </IconButton>
                <Button
                  onClick={() => {
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("token");
                    handleLogout();
                    navigate("/");
                  }}
                >
                  <LogoutIcon />
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
