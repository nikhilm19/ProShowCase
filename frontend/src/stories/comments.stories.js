import React from "react";
import ReactDOM from "react-dom";
import GoogleAvatar from "../components/GoogleAvatar/GoogleAvatar";
import FilterProjects from "../components/FilterProjects";
import Logo from "../logos/Purple Rectangles Attorney & Law Logo (1).png";
import Header from "../components/Header";

import Snackbar from "../components/Snackbar/Snackbar";
export default {
  title: "comments",
  component: FilterProjects,
};
const Template = (args) => <Snackbar {...args} />;
export const Primary = Template.bind({});
Primary.args = { text: "Hello", type: "error" };

const list = [
  {
    user: { name: "nikhil" },
    text:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    createdAt: "1234",
  },
];

export const AddComment = () => {
  return (
    <div>
      <textarea
        className="w-6/12 h-16 border p-4"
        placeholder="Type your comment here"
      ></textarea>
      <div className="mt-2">
        <button className="mr-2 bg-indigo-500 text-white p-4 py-2 hover:bg-indigo-400 transition duration-300 rounded">
          Comment
        </button>
        <button className=" text-black border p-4 py-2 hover:bg-indigo-100 transition duration-300 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};
export const DisplayComments = () => {
  return (
    <div className="mt-8 w-full flex justify-center items-center flex-col">
      <div className="w-1/2">
        <h1 className="text-2xl text-gray-700 font-title mb-4">Comments</h1>
        {list.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center w-6/12 text-gray-600 text-xl">
              No Comments found :(
            </h1>
            <img src="/images/no-data.gif" />
          </div>
        ) : (
          list.map(({ user, text, createdAt }) => (
            <div className="mb-2 group px-4 h-full flex flex-col  items-start text-center border-solid border-b-2 border-gray-200 animation-fadeInUp animation-1s  py-2 transition duration-700 ease-in-out  ">
              <div className="flex flex-row justify-start">
                <div className="mb-2 mr-4">
                  {" "}
                  <GoogleAvatar text={user.name[0]} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    {" "}
                    <h2 className="mr-2 m-0  text-gray-700 font-title transition duration-300 ease-in text-left ">
                      {user.name}
                    </h2>
                    <h1 className="m-0 text-xs text-left text-gray-400  transition duration-300 ease-in ">
                      {createdAt}
                    </h1>
                  </div>
                  <div className=" group w-full text-left flex flex-row">
                    <p className=" w-auto text-gray-600 text-xs">{text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
