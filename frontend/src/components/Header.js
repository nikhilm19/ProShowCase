import React, { useState } from "react";

import { Link } from "react-router-dom";
const Header = () => {
  const [isCollapse, doCollapse] = useState(true);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-purple-600 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-16">
        <span className="font-semibold text-xl tracking-tight">
          ProShowCase
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => doCollapse(!isCollapse)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block justify-center flex-grow lg:flex lg:items-center lg:w-auto ${
          isCollapse === true ? "hidden " : "visible"
        }`}
      >
        <div className="text-sm lg:flex-grow space-x-12 flex ">
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Docs
          </a>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Examples
          </a>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Blog
          </a>
        </div>
        <div>
          <Link
            to="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
