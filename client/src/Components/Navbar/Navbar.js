import { MenuItems } from "./MenuItems";
import { Link, useNavigate } from "react-router-dom";
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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../Assets/logo.svg"

const Navbar = () => {
  const settings = [
    { name: "Profile", link: "/profile" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Logout", link: "/logout" },
  ];
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
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      setShow(false);
      setUname(user.name);
    }
  }, [show]);

  return (
    <AppBar
      style={{ background: "transparent", boxShadow: "none" }}
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
            <img src={Logo} alt="img" loading="lazy" />
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
                    <Link
                      to={page.link}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {" "}
                      {page.name}{" "}
                    </Link>
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
            {MenuItems.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 5,
                  mx: 3,
                  display: "block",
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#434343",
                  fontFamily: "Inter, sans-serif",
                }}
                component={Link}
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
                  my: 5,
                  mx: 3,
                  display: "block",
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#434343",
                  fontFamily: "Inter, sans-serif",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login/Signup
              </Button>
            ) : (
              <>
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography
                      sx={{
                        mx: 1,
                        display: "block",
                        fontWeight: "bold",
                        fontSize: 17,
                        color: "#434343",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {uname}
                    </Typography>
                    <Avatar alt="User"></Avatar>
                  </IconButton>
                </Tooltip>
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
                        component={Link}
                        to={setting.link}
                        style={{ textDecoration: "none", color: "black" }}
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
