import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

class ProjectDisplay extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount() {}
  render() {
    const { project } = this.props;
    return (
      <div className="flex flex-row mx-auto">
        <div className="w-6/12">
          <img
            style={{ height: "400px" }}
            src="/images/undraw_project_completed_w0oq.png"
            className="w-auto"
          />
        </div>
        <div className="w-6/12">
          <div className="z-10">
            <div className="w-full ">
              <h1 className="text-3xl w-full text-center ">{project.title}</h1>
              <h1 className="text-xl w-auto text-center">
                brief: {project.brief}
              </h1>
            </div>
          </div>

          <div className="mx-auto w-full flex flex-col justify-center">
            <h1 className="text-xl w-auto text-center">
              Demo Link: {project.demo}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDisplay;
