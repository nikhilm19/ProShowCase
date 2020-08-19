import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
import { signInUser } from "../actions/index";

import Users from "../apis/user";
import Loader from "./Loader/Loader";
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
              <Avatar className=" mx-auto ">
                {this.props.currentUser.name
                  ? this.props.currentUser.name[0]
                  : ""}
              </Avatar>
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
export default connect(mapStateToProps)(UserProfile);
