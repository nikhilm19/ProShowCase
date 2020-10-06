import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";

import { postComment } from "../actions";
import SnackBar from "./Snackbar/Snackbar";
import ViewComments from "./ViewComments";
function createInput({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) {
  return (
    <textarea
      id="comment-text"
      label={label}
      placeholder={label}
      className={"w-6/12 h-16 border p-4"}
      {...input}
      {...custom}
    />
  );
}
const PostComment = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} id="comment-form">
      <div className="w-full flex justify-center flex-col items-center">
        <Field component={createInput} name="text" />
        <div className="mt-2">
          <button className="mr-2 bg-indigo-500 text-white p-4 py-2 hover:bg-indigo-400 transition duration-300 rounded">
            Comment
          </button>
          <button className=" text-black border p-4 py-2 hover:bg-indigo-100 transition duration-300 rounded">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

let PostCommentForm = reduxForm({
  form: "PostComment",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(PostComment);

class Post extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isValid: null,
    };
  }
  handleCommentSubmit = (values) => {
    console.log(values);
    console.log(this.props.match.params.project_id);
    values = {
      ...values,
      project: this.props.match.params.project_id,
      user: this.props.user,
      createdAt: new Date(),
    };

    this.props.postComment((data) => {
      console.log("callback", data);
      this.setState({ isValid: data.success });
      if (data.success === true)
        document.getElementById("comment-text").value = null;
    }, values);
    console.log("posted comment");
  };

  renderSnackBar = () => {
    if (this.state.isValid === false)
      return <SnackBar type="error" text="Sorry, something went wrong" />;
    else if (this.state.isValid === true)
      return <SnackBar type="success" text="Comment Posted" />;
  };

  render() {
    console.log(this.props);
    return (
      <>
        <PostCommentForm onSubmit={this.handleCommentSubmit} />
        {this.renderSnackBar()}
        <ViewComments {...this.props} isValid={this.state.isValid} />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    user:
      state.authReducer.currentUser !== undefined
        ? state.authReducer.currentUser._id
        : null,
    comment: state.projectReducer.comment,
    error: state.projectReducer.error,
    success: state.projectReducer.success,
  };
};

export default connect(mapStateToProps, { postComment })(Post);
