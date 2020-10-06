import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { Link } from "react-router-dom";

import Loader from "./Loader/Loader";
import Shadow from "./Shadow/Shadow";

import Logo from "../logos/Purple Rectangles Attorney & Law Logo (7).png";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: "url('images/wave.svg')",
          backgroundRepeat: "no-repeat",
          zIndex: 2,
        }}
      >
        <header class="text-gray-700 body-font relative">
          <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img src={Logo} width="50px" height="50px" className="mr-2" />
              <span class="ml-3 text-xl">ProShowCase</span>
            </a>
            <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center"></nav>

            <Link to="/signup">
              {" "}
              <button class="hidden font-buttons md:w-full sm:w-full lg:w-full sm:flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-3 md:text-lg md:px-8">
                Sign Up
              </button>
            </Link>
          </div>
        </header>
        <div class="relative sm:mt-10 overflow-hidden  flex flex-col sm:flex-row">
          <div class="mx-auto w-full sm:w-7/12">
            <div class="relative z-10 pb-8  sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
              <main class="mt-10  max-w-screen-xl px-4 sm:mt-12 sm:px-3 md:mt-16 lg:mt-20 lg:px-4 xl:mt-28">
                <div class="sm:pl-10 sm:text-center lg:text-left flex justify-center flex-col">
                  <h2 className=" font-title text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                    Projects built by your
                    <br class="xl:hidden" />
                    <span class=" text-indigo-600 font-title">
                      {" "}
                      Seniors with ❤️
                    </span>
                  </h2>
                  <p class="font-display mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    With this amazing wall of projects, take a look at what your
                    peers have built over the years
                  </p>
                  <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start flex sm:flex-row justify-center ">
                    <div class="mt-3 sm:mt-0 sm:ml-3 lg:mr-0 mr-4">
                      <Shadow>
                        <Link to="/signup">
                          {" "}
                          <button class="font-buttons w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                            Sign Up
                          </button>
                        </Link>
                      </Shadow>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                      <Shadow>
                        <Link to="/login">
                          <button class="font-buttons w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-black bg-indigo-100  hover:bg-indigo-200  focus:outline-none  focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                            Login
                          </button>
                        </Link>
                      </Shadow>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div class="w-full sm:w-6/12 p-0 sm:pt-0">
            <img
              class="mx-auto h-full w-full sm:h-72 md:h-96 lg:w-8/12 lg:h-full object-cover"
              src="/images/pair-prog.gif"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
