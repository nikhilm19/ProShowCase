import React from "react";

import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import renderField from "../renderField";

import Button from "@material-ui/core/Button";

import ImageUpload from "../ImageUpload";
const WizardFormFirstPage = (props) => {
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
            name="publishedPapers"
            label="Published paper link"
            id="title"
            placeholder="Link to the paper"
            component={createInput}
          ></Field>
          <Field
            name="publishedPatent"
            label="Patent Paper link"
            id="patent"
            placeholder="Link to the patent"
            component={createInput}
          ></Field>
          <Field
            label="Reference papers/sites "
            id="referencePapers"
            name="referenceMaterial"
            placeholder="Add links comma seperated"
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
})(WizardFormFirstPage);
