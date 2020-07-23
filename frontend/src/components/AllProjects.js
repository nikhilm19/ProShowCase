import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Project from "../apis/project";
import Loader from "./Loader";
import ProjectCard from "./ProjectCard";
import FilterProjects from "./FilterProjects";
import { filterProjects } from "../actions";
import ProjectReducer from "../reducers/ProjectReducer";

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

  renderFilteredProjects = () => {
    if (
      this.props.projects &&
      this.props.success === true &&
      this.props.projects !== this.state.projects
    ) {
      this.setState({ projects: this.props.projects });
    }
  };

  getFilteredProjects = (guides, technologies, members) => {
    //make api call

    console.log(guides, technologies, members);
    this.props.filterProjects(guides, technologies, members);
  };

  renderProjects = () => {
    console.log(this.props.projects);
    console.log(this.state.projects);

    this.renderFilteredProjects();
    return (
      <section class="text-gray-700 body-font overflow-visible">
        <div class="container px-5 py-10 mx-auto overflow-visible">
          <div class="flex flex-wrap w-full mb-20 overflow-visible">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-0 mx-auto sticky">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 text-center ">
                All Projects!
              </h1>
              <div class="h-1 w-20 z-10 bg-indigo-500 rounded mx-auto"></div>
            </div>

            {this.state.projects === null ? (
              ""
            ) : (
              <FilterProjects getFilteredProjects={this.getFilteredProjects} />
            )}
          </div>
          {this.state.projects === null ? (
            <div class="flex flex-wrap -m-4">
              {[1, 2, 3, 4].map((project) => {
                return (
                  <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                    <ProjectCard isLoading={true} {...this.props} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div class="flex flex-wrap z-1">
              {this.state.projects.map((project) => {
                return (
                  <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                    <ProjectCard project={project} {...this.props} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  };

  render() {
    return this.renderProjects();
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("map", state);
  return {
    projects: state.projectReducer.message,
    success: state.projectReducer.success,

    // add filtered params here
  };
};
export default connect(mapStateToProps, { filterProjects })(AllProjects);
