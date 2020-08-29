import React from "react";

import GoogleAvatar from "../GoogleAvatar/GoogleAvatar";
const TeamMember = (props) => {
  const { member } = props;
  return (
    <div className="w-64 p-4">
      <div className=" group px-2 h-full flex flex-col hover:shadow-2xl items-center text-center shadow-md animation-fadeInUp animation-1s hover:bg-purple-500 py-4 transition duration-700 ease-in-out  ">
        <div className="mb-2">
          {" "}
          <GoogleAvatar text={member.name[0]} />
        </div>
        <div className=" group w-full ">
          <h2 className="text-lg group-hover:text-white font-bold transition duration-300 ease-in">
            {member.name}
          </h2>
          <h3 className="text-xs group-hover:text-white mb-3 transition duration-300 ease-in">
            {member.email}
          </h3>
          <p className="group-hover:text-white text-gray-500 transition duration-300 ease-in">
            {props.isGuide ? "The Guide" : member.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
