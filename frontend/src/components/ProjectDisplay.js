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
import ProjectCard from "./ProjectCard";
class ProjectDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { project: {}, projects: [] };
    if (props.project !== null) {
      this.state = { project: props.project, projects: [] };
    }
  }

  fetchProject = async () => {
    console.log("hello");
    if (this.props.currentUser.type === "guide") {
      const res = await Project.get(`/?guide=${this.props.currentUser.email}`);
      const projects = res.data.projects;

      console.log(projects);

      this.setState({ projects });
    }

    if (this.state.project === null) {
      //console.log(this.props.match.params.project_id);
      const res = await Project.get("/" + "5f08c3220b7dfe0e131319a1");

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
    //console.log(this.props.match.params);
    //console.log(JSON.stringify(this.props.location));

    console.log(this.state.projects);

    return this.state.projects === null ? (
      <Loader isLoading={true} />
    ) : (
      <section class="text-gray-700 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-wrap w-full mb-20">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-0 mx-auto">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 text-center ">
                My Projects!
              </h1>
              <div class="h-1 w-20 bg-indigo-500 rounded mx-auto"></div>
            </div>
          </div>
          <div class="flex flex-wrap ">
            {this.state.projects.map((project) => {
              return (
                <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                  <ProjectCard project={project} {...this.props} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
    {
      /*<div className="p-2 ">
        <ProjectAbstract project={this.state.project} />
        <Team project={this.state.project} />
        <div className="mx-10">
          {" "}
          <ImageCarousel />
        </div>
        <ProjectResearch project={this.state.project} />
            </div>*/
    }
  }
}

export default ProjectDisplay;
