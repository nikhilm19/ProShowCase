import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Project from "../apis/project";
import Loader from "./Loader/Loader";
import ProjectCard from "./Cards/Project";
import FilterProjects from "./FilterProjects";
import { filterProjects } from "../actions";
import NotFound from "../components/404";

class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    if (this.state.projects == null) {
      const res = await Project.get("/");
      const projects = res.data.projects;

      this.setState({ projects });
      console.log(JSON.stringify(projects));
    }
  };

  renderFilteredProjects = () => {
    if (
      this.props.projects &&
      this.props.success === true &&
      this.props.projects !== this.state.projects
    ) {
      this.setState({ projects: this.props.projects, error: false });
    } else if (this.props.success === false && this.state.error === false) {
      this.setState({ error: "No Projects found!", projects: null });
    }
  };

  getFilteredProjects = (guides, technologies, batches) => {
    //make api call

    // send only emails, title and years

    let guideEmails = guides.map((guide) => {
      return guide.email;
    });
    let techs = technologies.map((tech) => {
      return tech.title;
    });
    let batch = batches.map((batch) => {
      return batch.year;
    });

    console.log(guideEmails, techs, batch);
    this.props.filterProjects(guideEmails, techs, batch);
  };

  renderProjectsContent = () => {
    console.log(this.props.projects);
    console.log(this.state.projects);
    if (this.state.projects === null) {
      return <FilterProjects getFilteredProjects={this.getFilteredProjects} />;
    }
    if (this.state.error !== false) return <NotFound />;
    else if (this.state.projects === null && this.state.error === false) {
      return (
        <div class="flex flex-wrap -m-4">
          {[1, 2, 3, 4].map((project) => {
            return (
              <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                <ProjectCard isLoading={true} {...this.props} />
              </div>
            );
          })}
        </div>
      );
    } else
      return (
        <div class="flex flex-wrap z-1">
          {this.state.projects.map((project) => {
            return (
              <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                <ProjectCard projectDetail={project} {...this.props} />
              </div>
            );
          })}
        </div>
      );
  };

  renderProjects = () => {
    this.renderFilteredProjects();
    return (
      <section class="text-gray-700 body-font overflow-visible">
        <div class="container px-5 py-10 mx-auto overflow-visible">
          <div class="flex flex-wrap w-full mb-10 overflow-visible">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-0 mx-auto sticky">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 text-center ">
                All Projects!
              </h1>
              <div class="h-1 w-20 z-10 bg-indigo-500 rounded mx-auto"></div>
            </div>
            <FilterProjects getFilteredProjects={this.getFilteredProjects} />
          </div>
          {this.state.projects === null && this.state.error === false ? (
            <div class="flex flex-wrap -m-4">
              {[1, 2, 3, 4].map((project) => {
                return (
                  <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                    <ProjectCard isLoading={true} {...this.props} />
                  </div>
                );
              })}
            </div>
          ) : this.state.error !== false ? (
            <NotFound />
          ) : (
            <div class="flex flex-wrap z-1">
              {this.state.projects.map((project) => {
                return (
                  <div class="xl:w-1/4 md:w-1/2 p-4 w-full">
                    <ProjectCard projectDetail={project} {...this.props} />
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
