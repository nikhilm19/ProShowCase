import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import Project from "../apis/project";
import User from "../apis/user";
import AddProject from "./AddProject";
import UserProfile from "./UserProfile";
import ProjectDisplay from "./ProjectDisplay";
import Loader from "./Loader";

class UserProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      project: null,
    };
  }

  componentDidMount() {
    this.fetchProject("160420107056");
  }
  fetchProject = async (userId) => {
    const { cookies } = this.props;
    console.log(this.props);
    if (this.props.currentUser) {
      //const res = await User.get(`/${userId}`);
      //const user = res.data;
      console.log(this.props.currentUser);
      if (this.props.currentUser.project !== null) {
        let projectRes = await Project.get("5f0d95c0a23c2a05fd40c927", {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        });
        console.log(projectRes);
        const project = projectRes.data;
        this.setState({
          project,
        });
      } else {
        this.setState({
          project: "",
        });
      }
      console.log(this.state);
    }
  };
  handleChange = (fies) => {};

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  displayProject = () => {
    if (this.state.project === null) {
      return <Loader isLoading={true} />;
    } else if (this.state.project === "") {
      return <AddProject {...this.props} />;
    } else
      return <ProjectDisplay project={this.state.project} {...this.props} />;
  };

  render() {
    return <div>{this.displayProject()}</div>;
  }
}

export default UserProject;
