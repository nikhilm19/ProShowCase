import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Project from "../apis/project";
import Loader from "./Loader";
import ProjectCard from "./ProjectCard";

class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    const res = await Project.get("/");
    const projects = res.data.projects;

    this.setState({ projects });

    console.log(JSON.stringify(projects));
  };

  renderProjects = () => {
    if (this.state.projects === null) {
      return (
        <section class="text-gray-700 body-font">
          <div class="container px-5 py-10 mx-auto">
            <div class="flex flex-wrap w-full mb-20">
              <div class="lg:w-1/2 w-full mb-6 lg:mb-0 mx-auto">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 text-center ">
                  All Projects!
                </h1>
                <div class="h-1 w-20 bg-indigo-500 rounded mx-auto"></div>
              </div>
            </div>
            <div class="flex flex-wrap -m-4">
              {[1, 2, 3, 4].map((project) => {
                return (
                  <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                    <ProjectCard isLoading={true} {...this.props} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    } else
      return (
        <section class="text-gray-700 body-font">
          <div class="container px-5 py-10 mx-auto">
            <div class="flex flex-wrap w-full mb-20">
              <div class="lg:w-1/2 w-full mb-6 lg:mb-0 mx-auto">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 text-center ">
                  All Projects!
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
  };

  render() {
    return this.renderProjects();
  }
}

export default AllProjects;
