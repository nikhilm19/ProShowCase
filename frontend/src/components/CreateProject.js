import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import CreateProjectSteps from "./CreateProjectSteps";
import Abstract from "./Forms/Abstract";
import Implementation from "./Forms/Implementation";
import ProjectResearch from "./Forms/ProjectResearch";
import Modules from "./Forms/Modules";
import Team from "./Forms/Team";
import axios from "axios";

import { createProject } from "../actions/index";

class CreateProject extends React.Component {
  constructor() {
    super();

    this.createInput = this.createInput.bind(this);
    this.state = {
      page: 1,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  handleSubmit = (formProps, members, guide) => {
    console.log("yes" + JSON.stringify(formProps) + JSON.stringify(members));
    this.props.createProject(formProps, members,guide);
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  validate = (values) => {
    const errors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "favoriteColor",
      "notes",
    ];
    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "Required";
      }
    });
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  createInput = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );

  render() {
    return (
      <div className="p-8">
        <form>
          <div className="flex flex-col w-full justify-center items-center w-full">
            <CreateProjectSteps activeStep={this.state.page} />

            <div className="flex flex-col  justify-center w-8/12">
              {" "}
              {this.state.page === 1 && <Abstract onSubmit={this.nextPage} />}
              {this.state.page === 2 && (
                <Implementation
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                />
              )}
              {this.state.page === 3 && (
                <ProjectResearch
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                />
              )}
              {this.state.page === 4 && (
                <Team
                  previousPage={this.previousPage}
                  onSubmit={this.handleSubmit}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    project: state.project,
  };
};

const form = reduxForm({
  form: "CreateProject",
})(CreateProject);

export default connect(mapStateToProps, { createProject })(form);
