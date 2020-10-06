import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DoneIcon from "@material-ui/icons/Done";
import { withStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

import Snackbar from "./Snackbar/Snackbar";
import Loader from "./Loader/Loader";

const useStyles = (theme) => ({
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
});
class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
    this.state = { user: null };
  }
  componentDidMount() {
    // const { cookies } = this.props;
    // console.log(this.props);
    // if (this.props.currentUser) {
    //   this.setState({ user: this.props.currentUser });
    // }
  }

  renderUser = () => {
    const { classes } = this.props;
    if (
      this.props.currentUser === null ||
      this.props.currentUser === undefined
    ) {
      return <Loader isLoading={true} />;
    } else
      return (
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="w-6/12">
            <img
              src="/images/undraw_account_490v.png"
              className="h-full w-full"
              style={{ height: "100%" }}
            />
          </div>

          <div className="z-10 flex flex-col  justify-center">
            <div className="w-full ">
              <div className="flex flex-row items-center justify-center w-full">
                <Avatar className={classes.avatar}>
                  {this.props.currentUser.name
                    ? this.props.currentUser.name[0]
                    : ""}
                </Avatar>
                {this.props.currentUser.isVerified ? (
                  <div className="flex flex-row">
                    <DoneIcon />
                    <p>Verified</p>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    <ErrorOutlineIcon />
                    <p>Not Verified</p>
                  </div>
                )}
              </div>

              <div className="m-2">
                <TextField
                  value={this.props.currentUser.name}
                  variant="outlined"
                  label="Name"
                  disabled
                  className="m-2"
                />
              </div>
              <div className="m-2">
                {" "}
                <TextField
                  value={this.props.currentUser.email}
                  variant="outlined"
                  label="Email"
                  disabled
                />
              </div>
            </div>
            {!this.props.currentUser.isVerified ? (
              <Snackbar type={"error"} text="Please verify your email" />
            ) : (
              ""
            )}

            {this.props.currentUser.type === "student" ? (
              <div className="mx-auto w-full flex flex-col justify-center">
                <div className="m-2">
                  <TextField
                    value={this.props.currentUser.enrollment_no}
                    variant="outlined"
                    label="enrollment_no"
                    disabled
                  />
                </div>
                <div className="m-2">
                  <TextField
                    value={this.props.currentUser.dept}
                    variant="outlined"
                    label="Department"
                    disabled
                  />
                </div>
                <div className="m-2">
                  <TextField
                    value={this.props.currentUser.grad_year}
                    variant="outlined"
                    label="Batch"
                    disabled
                  />
                </div>
              </div>
            ) : (
              <div className="mx-auto w-full flex flex-col justify-center">
                <div className="m-2">
                  <TextField
                    value={this.props.currentUser.phone}
                    variant="outlined"
                    label="Phone Number"
                    disabled
                  />
                </div>
                <div className="m-2">
                  <TextField
                    value={this.props.currentUser.dept}
                    variant="outlined"
                    label="Department"
                    disabled
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
  };
  render() {
    return this.renderUser();
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    currentUser: state.authReducer.currentUser,
  };
};

// export default UserProfile;
export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));
