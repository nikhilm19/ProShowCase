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

import { createProject, imageUpload } from "../actions/index";
import history from "../history";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);

    this.createInput = this.createInput.bind(this);
    this.state = {
      page: 1,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  handleSubmit = (formProps, members, guide, batch) => {
    console.log("yes" + JSON.stringify(formProps) + JSON.stringify(members));
    console.log(formProps);
    this.props.createProject(
      formProps,
      members,
      guide,
      this.props.implementationSnaps,
      history,
      batch
    );
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
      <div className="p-2 w-full flex justify-center">
        <form className="sm:w-9/12 w-full">
          <div className="flex flex-row w-full justify-center items-center w-7/12">
            <CreateProjectSteps activeStep={this.state.page} className="w-7/12">
              <div className="flex flex-col  justify-center w-full">
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
            </CreateProjectSteps>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    project: state.projectReducer.projectData,
    implementationSnaps: state.projectReducer.implementationSnaps,
  };
};

const form = reduxForm({
  form: "CreateProject",
})(CreateProject);

export default connect(mapStateToProps, { createProject, imageUpload })(form);
