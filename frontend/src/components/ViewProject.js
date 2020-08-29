import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Project from "../apis/project";
import Team from "./ViewProject/Team";
import ProjectAbstract from "./ViewProject/ProjectAbstract";
import Tabs from "./ViewProject/Tabs";
import Navigation from "./ViewProject/Navigation";
import ImageCarousel from "./ViewProject/Implementation";
import ProjectResearch from "./ViewProject/ProjectResearch";
import Loader from "./Loader/Loader";
class ViewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { project: null };
    console.log(this.props);
    // const { project } = this.props.history.location;
    // this.setState({ project });
    // console.log(this.state);
  }

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
    console.log(this.props.location);

    return this.state.project === null ? (
      <Loader isLoading={true} />
    ) : (
      <div className="p-2 ">
        <ProjectAbstract project={this.state.project} />
        <Team project={this.state.project} images={this.state.images} />
        <div className="mx-5">
          {" "}
          {this.state.project.implementationSnaps &&
          this.state.project.implementationSnaps.length > 0 ? (
            <ImageCarousel data={this.state.project.implementationSnaps} />
          ) : (
            ""
          )}
        </div>
        {(this.state.project.publishedPapers &&
          this.state.project.publishedPapers.length > 0) ||
        (this.state.project.referenceMaterial &&
          this.state.project.referenceMaterial.length > 0) ? (
          <ProjectResearch project={this.state.project} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ViewProject;
