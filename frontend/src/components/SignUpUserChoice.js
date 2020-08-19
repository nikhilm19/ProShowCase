import React from "react";

import history from "../history";
import Shadow from "./Shadow/Shadow";
class SignUpUserChoice extends React.Component {
  constructor() {
    console.log("inside signup");
    super();
  }

  onGuideSignUp = () => {};

  render() {
    return (
      <div className="signup-choice-container  w-full flex justify-center sm:h-screen h-auto sm:p-8">
        <div className="signup-choice-content flex flex-col w-10/12 justify-center items-center sm:flex-row mt-2 mb-10 ">
          <div className="signup-choice-content--student  w-full">
            <div className=" flex justify-center flex-col items-center">
              <div className="w-full flex justify-center lg:w-8/12 w-full">
                <img
                  src="/images/undraw_exams_g4ow.png"
                  style={{ width: "80%", height: "220px" }}
                ></img>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <h1 className="text-2xl text-blue-900 lg:text-4xl font-display">
                    I am a Student
                  </h1>
                </div>
                <div className="flex  justify-center">
                  <Shadow>
                    <button
                      onClick={() => history.push("/signup/student")}
                      className="font-buttons hover:shadow-xl transition ease-in-out duration-500 rounded shadow-md bg-indigo-600 p-2 px-8 text-white"
                    >
                      Join Now!
                    </button>
                  </Shadow>
                </div>
              </div>
            </div>
          </div>
          <div className="signup-choice-content--faculty w-full ">
            <div className="container flex justify-center flex-col items-center">
              <div className="w-full flex justify-center lg:w-8/12 w-full">
                <img
                  src="/images/undraw_teacher_35j2.png"
                  className=""
                  style={{ width: "90%", height: "220px" }}
                ></img>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <h1 className="text-2xl text-blue-900  lg:text-4xl font-display">
                    I am a Guide
                  </h1>
                </div>
                <div className="flex  justify-center">
                  <Shadow>
                    <button
                      onClick={() => history.push("/signup/guide")}
                      className="font-buttons hover:shadow-xl transition ease-in-out duration-500 rounded shadow-md bg-indigo-600 p-2 px-8 text-white"
                    >
                      Join Now!
                    </button>
                  </Shadow>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpUserChoice;
