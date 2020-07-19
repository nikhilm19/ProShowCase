import React from "react";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";

import renderField from "../renderField";
import ImageUpload from "../ImageUpload";

class WizardFormSecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      technologies: [
        { title: "NLP" },
        { title: "ML" },
        { title: "AI" },
        { title: "IOT" },
        { title: "Android" },
        { title: "Webapp" },
        { title: "AR/VR" },
        { title: "DM" },
        { title: "Networks" },
        { title: "Security" },
      ],
    };

    this.createInput = this.createInput.bind(this);
  }

  handleFileChange = (files) => {
    this.setState({ files });
  };
  createInput = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <div className="w-full">
      <TextField
        style={{ width: "100%" }}
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
      />
    </div>
  );

  adaptFileEventToValue = (delegate) => (e) => {
    console.log(e.target.files[0]);
    delegate(e.target.files[0]);
  };

  FileInput = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    meta: omitMeta,
    ...props
  }) => (
    <input
      onChange={this.adaptFileEventToValue(onChange)}
      onBlur={this.adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
      {...props}
    />
  );

  MultipleComplete = ({ input, meta: { touched, error, submitFailed } }) => {
    const { onChange } = input;
    return (
      <div>
        <Autocomplete
          multiple
          freeSolo
          limitTags={2}
          value={input.value || []}
          id="multiple-limit-tags"
          options={this.state.technologies}
          onChange={(e, newValue) => {
            onChange(newValue);
          }}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Choose Technologies"
              fullWidth
            />
          )}
        />
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-full">
            <Field
              type="text"
              component={this.MultipleComplete}
              label="technologies"
              name="technologies"
            />
            <div className="mt-2 mb-4 ">
              <Field
                label="Repository"
                id="repo"
                name="githubRepo"
                component={this.createInput}
              ></Field>
            </div>
            <div className="mt-2 mb-4 ">
              <Field
                label="Images"
                id="snaps"
                name="implementationSnaps"
                component={ImageUpload}
                type="file"
              ></Field>
            </div>

            <div className="mt-4">
              <Button variant="outlined" color="primary" type="submit">
                Next
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "CreateProject",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(WizardFormSecondPage);
