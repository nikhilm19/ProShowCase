import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Project from "../apis/project";
import Team from "./ViewProject/Team";
import ProjectAbstract from "./ViewProject/ProjectAbstract";
import Tabs from "./ViewProject/Tabs";
import Navigation from "./ViewProject/Navigation";
import ImageCarousel from "./ViewProject/ImageCarousel";
import ProjectResearch from "./ViewProject/ProjectResearch";
import Loader from "./Loader";
class ViewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { project: null };
    const { project } = this.props.location;
    this.setState({ project });
    console.log(this.state);
  }

  fetchFakeImages = async () => {
    const res = await axios.get("https://picsum.photos/v2/list");

    const images = res.data;
    this.setState({ images });
  };

  fetchProject = async () => {
    console.log("hello");
    if (this.state.project === null) {
      console.log(this.props.match.params.project_id);
      const res = await Project.get("/" + this.props.match.params.project_id);

      console.log("res" + res.data);

      this.setState({ project: res.data });
      console.log(res.data);

      console.log(this.state.project);
    }
  };

  componentDidMount() {
    this.fetchProject();
  }

  render() {
    console.log(this.props.match.params);
    console.log(JSON.stringify(this.props.location));

    return this.state.project === null ? (
      <Loader isLoading={true} />
    ) : (
      <div className="p-2 ">
        <ProjectAbstract project={this.state.project} />
        <Team project={this.state.project} images={this.state.images} />
        <div className="mx-10">
          {" "}
          <ImageCarousel />
        </div>
        <ProjectResearch project={this.state.project} />
      </div>
    );
  }
}

export default ViewProject;
