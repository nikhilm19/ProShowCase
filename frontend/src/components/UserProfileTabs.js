import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UserProfile from "./UserProfile";
import UserProject from "./UserProject";

function TabPanel(props) {
  console.log("TabPanel----", props);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  tabBar: {
    backgroundColor: "#4e4691",
  },
}));

export default function UserProfileTabs(props) {
  console.log("Inside profile tabs ------->");
  console.log(props);
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const [label, setLabel] = React.useState("My Project");

  //if (props.currentUser.type === "guide") setLabel("My Projects");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          centered
          className={classes.tabBar}
        >
          <Tab value="one" label="About me" wrapped {...a11yProps("one")} />
          <Tab value="two" label={label} {...a11yProps("two")} />
        </Tabs>
      </AppBar>
      <div></div>
      <TabPanel value={value} index="one">
        <UserProfile {...props} />
      </TabPanel>
      <TabPanel value={value} index="two">
        <UserProject {...props} />
      </TabPanel>
    </div>
  );
}
