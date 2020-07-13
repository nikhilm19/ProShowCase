import React from "react";

import Shadow from "./Shadow";
class SignUpUserChoice extends React.Component {
  constructor() {
    super();
  }

  onGuideSignUp = () => {};

  render() {
    return (
      <div className="signup-choice-container  w-full flex justify-center h-screen ">
        <div className="signup-choice-content flex flex-col w-10/12 justify-center items-center sm:flex-row ">
          <div className="signup-choice-content--student w-full h-auto">
            <div className="container flex justify-center flex-col items-center">
              <div className="w-full flex justify-center">
                <img
                  src="/images/undraw_exams_g4ow.png"
                  className=""
                  style={{ width: "70%", height: "270px" }}
                ></img>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <h1 className="text-4xl text-blue-900 font-mono">
                    I am a Student
                  </h1>
                </div>
                <div className="flex  justify-center">
                  <Shadow>
                    <button
                      onClick={() => this.props.history.push("/signup/student")}
                      className="hover:shadow-xl transition ease-in-out duration-500 rounded shadow-md bg-indigo-600 p-4 px-8 text-white"
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
              <div className="w-full flex justify-center">
                <img
                  src="/images/undraw_teacher_35j2.png"
                  className=""
                  style={{ width: "70%", height: "270px" }}
                ></img>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <h1 className="text-4xl text-blue-900 font-mono">
                    I am a Guide
                  </h1>
                </div>
                <div className="flex  justify-center">
                  <Shadow>
                    <button
                      onClick={() => this.props.history.push("/signup/guide")}
                      className="hover:shadow-xl transition ease-in-out duration-500 rounded shadow-md bg-indigo-600 p-4 px-8 text-white"
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
