import React from "react";
import ReactDOM from "react-dom";
import GoogleAvatar from "../components/GoogleAvatar/GoogleAvatar";
import FilterProjects from "../components/FilterProjects";
import Logo from "../logos/Purple Rectangles Attorney & Law Logo (1).png";
import Header from "../components/Header";

import Snackbar from "../components/Snackbar/Snackbar";
export default {
  title: "Snackbar",
  component: Snackbar,
};
const Template = (args) => <Snackbar {...args} />;
export const Primary = Template.bind({});
Primary.args = { text: "Hello", type: "error" };
