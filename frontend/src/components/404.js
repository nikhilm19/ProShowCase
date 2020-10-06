import React from "react";
class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex flex-col justify-center items-center mt-5 ">
        <div className="flex flex-col justify-center items-center  w-8/12">
          <h1 className="text-purple-500 font-title text-3xl">
            No projects found :(
          </h1>
          <img src="/images/404.gif" className=""></img>
        </div>
      </div>
    );
  }
}

export default NotFound;
