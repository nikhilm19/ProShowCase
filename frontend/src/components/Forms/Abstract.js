import React from "react";

import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import renderField from "../renderField";

import Button from "@material-ui/core/Button";

import ImageUpload from "../ImageUpload";
const Abstract = (props) => {
  const { handleSubmit } = props;

  const createInput = ({
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex justify-center">
        <div className="flex flex-col w-full">
          <Field
            name="title"
            label="Title"
            id="title"
            placeholder="Title of the project"
            component={createInput}
          ></Field>
          <Field
            label="Brief"
            id="brief"
            name="brief"
            component={createInput}
          ></Field>
          <Field
            label="Demo Link"
            id="demo"
            name="demo"
            component={createInput}
          ></Field>
          <Field
            label="keywords"
            id="keyword"
            name="keywords"
            component={createInput}
          ></Field>
          <div className="mt-8">
            <Button variant="outlined" color="primary" type="submit">
              Next
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "CreateProject",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Abstract);
