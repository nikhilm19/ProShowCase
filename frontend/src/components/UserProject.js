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
    const res = await User.get(`/${userId}`);
    const user = res.data;
    console.log(user);
    if (user.project !== null) {
      let projectRes = await Project.get("5f08c3220b7dfe0e131319a1");
      const project = projectRes.data;
      this.setState({
        user,
        project,
      });
    } else {
      this.setState({
        user,
        project: "",
      });
    }
    console.log(this.state);
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
    } else return <ProjectDisplay project={this.state.project} />;
  };

  render() {
    return <div>{this.displayProject()}</div>;
  }
}

export default UserProject;
