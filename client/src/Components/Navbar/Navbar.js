import { MenuItems } from "./MenuItems";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../Assets/logo.svg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const settings = [
    { name: "Profile", link: "/profile" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Logout", link: "/logout" },
  ];

  const userdata = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [uname, setUname] = useState();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (userdata) {
      setShow(false);
      setUname(userdata);
    }
  }, [show,userdata]);

  return (
    <AppBar
      style={{ background: "#EEF2FF", boxShadow: "none" }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src={Logo} alt="img" loading="lazy" width="80%" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, my: 3 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {MenuItems.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
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
                      to={page.link}
                    >
                      {" "}
                      {page.name}{" "}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img src={Logo} alt="img" loading="lazy" />
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
                onClick={handleCloseNavMenu}
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
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, borderRadius: "4px" }}
                >
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
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        component={NavLink}
                        to={setting.link}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
