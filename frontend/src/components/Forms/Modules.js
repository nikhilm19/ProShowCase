import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderModules = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <Button color="primary" onClick={() => fields.push({})}>
        Add Modules
      </Button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>

    <div className="flex flex-col">
      {fields.map((member, index) => (
        <div className="flex flex-col mt-4">
          <TextField label="Module Name" placeholder="Type module name" />
          <TextField
            label="Implementation"
            placeholder="How did you build it?"
          />
        </div>
      ))}
    </div>
  </ul>
);

const FieldArraysForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="modules" component={renderModules} />
      <div>
        <Button disabled={submitting}>Next</Button>
        <Button disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "CreateProject", // a unique identifier for this form
})(FieldArraysForm);
