import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import DonutLargeOutlinedIcon from "@material-ui/icons/DonutLargeOutlined";
import { Link, useHistory } from "react-router-dom";
import NavDrawer from "./NavDrawer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { logOut } from "../actions";
import Logo from "../logos/Purple Rectangles Attorney & Law Logo (7).png";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
  },
  appbar: {
    backgroundColor: "#3c366b",
    color: "white",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    marginLeft: theme.spacing(0.5),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  console.log(props);
  const classes = useStyles();
  const [isSignup, setIsSignUp] = React.useState(false);

  const history = useHistory();

  useEffect(() => {
    checkSignUpRoute();
  });

  const checkSignUpRoute = () => {
    if (
      history.location.pathname.startsWith("/signup") ||
      history.location.pathname.startsWith("/login") ||
      history.location.pathname === "/"
    )
      setIsSignUp(true);
    else setIsSignUp(false);
  };

  history.listen(checkSignUpRoute);

  console.log(history.location.pathname);

  console.log(isSignup);

  const [open, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!open);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    history.push("/logout");
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/Profile">
        <MenuItem onClick={handleMenuClose}> Profile</MenuItem>
      </Link>

      <MenuItem
        onClick={() => {
          dispatch(logOut(props.cookies));
          handleMenuClose();

          history.push("/");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => history.push("/profile")}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent" className={classes.appbar}>
        <Toolbar>
          {props.isAuthenticated ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <img src={Logo} width="50px" height="50px" />
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              ProShowCase
            </Typography>
          </Link>
          {props.isAuthenticated ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          ) : null}
          <div className={classes.grow} />
          {props.isAuthenticated ? (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          ) : null}

          {props.isAuthenticated ? (
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          ) : isSignup ? (
            ""
          ) : (
            <div className="flex flex-row">
              <Link to="/signup" className="mr-2">
                {" "}
                <button class="font-title w-full flex items-center justify-center px-1 sm:px-0 py-1 border border-transparent text-base leading-6 font-small rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-600 hover:text-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-2 md:text-lg md:px-5">
                  Signup
                </button>
              </Link>
              <Link to="/login">
                {" "}
                <button class="font-title w-full flex items-center justify-center px-1 py-1 border border-transparent text-base leading-6 font-small rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-2 md:text-lg md:px-5">
                  Login
                </button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <NavDrawer isDrawerOpen={open} handleDrawerClose={toggleDrawer} />
      {props.isAuthenticated ? renderMobileMenu : null}
      {props.isAuthenticated ? renderMenu : null}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
