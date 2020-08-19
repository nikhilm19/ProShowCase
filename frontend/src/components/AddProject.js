import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import history from "../history";

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
              <h1 className="text-3xl font-display text-center">
                You haven't added your project yet !{" "}
              </h1>
              <h1 className="text-1xl text-gray-500 text-center">
                Show the world what you have built !{" "}
              </h1>
              <div className="mt-16 flex justify-center">
                <Button
                  variant="contained"
                  onClick={() => history.push("/project/new")}
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                >
                  Let's go!
                </Button>
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
