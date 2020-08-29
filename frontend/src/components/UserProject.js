import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import Project from "../apis/project";
import User from "../apis/user";
import AddProject from "./AddProject";
import UserProfile from "./UserProfile";
import ProjectDisplay from "./ProjectDisplay";
import Loader from "./Loader/Loader";

class UserProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      project: null,
    };
  }

  componentDidMount() {
    this.fetchProject();
  }
  fetchProject = async () => {
    const { cookies } = this.props;
    console.log(this.props);
    if (this.props.currentUser) {
      this.setState({
        project: this.props.currentUser.project,

        //todo Set all projects  here
      });
      //const res = await User.get(`/${userId}`);
      //const user = res.data;
      console.log(this.props.currentUser);
      // if (
      //   !(
      //     this.props.currentUser.project &&
      //     this.props.currentUser.project.length > 0
      //   )
      // ) {
      //   let projectRes = await Project.get(this.props.currentUser.project[0], {
      //     headers: {
      //       Authorization: `Bearer ${cookies.get("token")}`,
      //     },
      //   });
      //   console.log(projectRes);
      //   const project = projectRes.data;
      //   this.setState({
      //     project,
      //   });
      // } else {
      //   this.setState({
      //     project: this.props.currentUser.project,

      //     //todo Set all projects  here
      //   });
      // }
      console.log(this.state);
    }
  };

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
    } else if (this.state.project === null || this.state.project.length === 0) {
      return <AddProject {...this.props} />;
    } else
      return <ProjectDisplay project={this.state.project} {...this.props} />;
  };

  render() {
    return <div>{this.displayProject()}</div>;
  }
}

export default UserProject;
