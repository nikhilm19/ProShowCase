import React from "react";
import ReactDOM from "react-dom";
import GoogleAvatar from "../components/GoogleAvatar/GoogleAvatar";
import FilterProjects from "../components/FilterProjects";
import Logo from "../logos/Purple Rectangles Attorney & Law Logo (1).png";
import Header from "../components/Header";

import Snackbar from "../components/Snackbar/Snackbar";
export default {
  title: "Hello",
  component: FilterProjects,
};
const Template = (args) => <Snackbar {...args} />;
export const Primary = Template.bind({});
Primary.args = { text: "Hello", type: "error" };
export const Card = () => {
  return <FilterProjects />;
};

export const header = () => {
  return <Header />;
};

export const logo = () => {
  return <img src={Logo} />;
};
export const TeamMemberCard = () => {
  return (
    <div className="w-64 p-4">
      <div className=" group px-2 h-full flex flex-col hover:shadow-2xl items-center text-center shadow-md animation-fadeInUp animation-1s hover:bg-purple-500 py-4 transition duration-700 ease-in-out  ">
        <div className="mb-2">
          {" "}
          <GoogleAvatar text={"N"} />
        </div>
        <div className=" group w-full ">
          <h2 className="text-lg group-hover:text-white font-bold transition duration-300 ease-in">
            Holden Caulfield
          </h2>
          <h3 className="text-xs group-hover:text-white mb-3 transition duration-300 ease-in">
            nikmul19@gmail.com
          </h3>
          <p className="group-hover:text-white text-gray-500 transition duration-300 ease-in">
            8583958
          </p>
        </div>
      </div>
    </div>
  );
};
