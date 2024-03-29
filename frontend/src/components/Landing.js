import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { Link } from "react-router-dom";

import Loader from "./Loader/Loader";
import Shadow from "./Shadow/Shadow";
class Landing extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="relative bg-white overflow-hidden animation-fadeInUp animation-1s">
        <div class="max-w-screen-xl mx-auto ">
          <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div class="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

            <main class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div class="sm:text-center lg:text-left flex justify-center flex-col">
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
                        <button class="font-buttons w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-900 bg-indigo-100  hover:bg-indigo-200  focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
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
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            class=" h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/images/undraw_code_typing_7jnv.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Landing;
