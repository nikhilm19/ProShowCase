import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link } from "react-router-dom";
import Shadow from "./Shadow/Shadow";
class AddProject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex flex-col justify-center items-center mt-10 ">
        <div className="flex flex-col justify-center items-center md:flex-row">
          <img
            src="/images/undraw_page_not_found_su7k.png"
            className="md:w-6/12"
          ></img>

          {this.props.currentUser.type === "student" ? (
            <div>
              {" "}
              <h1 className="text-3xl font-title text-center">
                You haven't added your project yet !{" "}
              </h1>
              <h1 className="text-1xl text-gray-500 text-center">
                Show the world what you have built !{" "}
              </h1>
              <div className="mt-12 flex justify-center px-4 sm:p-0">
                <Link
                  to="/project/new"
                  class="w-full font-buttons sm:w-4/12 flex items-center justify-center px-4 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-6"
                >
                  {" "}
                  <CloudUploadIcon className="mr-2" />
                  <button>Let's go!</button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-display text-wrap">
                Please ask your students to add the project!
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AddProject;
