import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
import { signInUser } from "../actions/index";

import Users from "../apis/user";
import Loader from "./Loader";
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  async componentDidMount() {
    const { cookies } = this.props;
    console.log(this.props);

    if (this.props.currentUser) {
      this.setState({ user: this.props.currentUser });
    }
    /*const data = await Users.get("/guide/" + this.props.currentUser.email, {
      headers: {
        Authorization: `Bearer ${cookies.cookies.token}`,
      },
    });
    console.log(data);
    const user = data.data.user;
    this.setState({
      user,
    });
    */
  }

  renderUser = () => {
    if (this.state.user === null) {
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
                {this.state.user.name ? this.state.user.name[0] : ""}
              </Avatar>
              <div className="m-2">
                <TextField
                  value={this.state.user.name}
                  variant="outlined"
                  label="Name"
                  disabled
                  className="m-2"
                />
              </div>
              <div className="m-2">
                {" "}
                <TextField
                  value={this.state.user.email}
                  variant="outlined"
                  label="Email"
                  disabled
                />
              </div>
            </div>
            {this.state.user.type === "student" ? (
              <div className="mx-auto w-full flex flex-col justify-center">
                <div className="m-2">
                  <TextField
                    value={this.state.user.enrollment_no}
                    variant="outlined"
                    label="enrollment_no"
                    disabled
                  />
                </div>
                <div className="m-2">
                  <TextField
                    value={this.state.user.dept}
                    variant="outlined"
                    label="Department"
                    disabled
                  />
                </div>
                <div className="m-2">
                  <TextField
                    value={this.state.user.grad_year}
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
                    value={this.state.user.phone}
                    variant="outlined"
                    label="Phone Number"
                    disabled
                  />
                </div>
                <div className="m-2">
                  <TextField
                    value={this.state.user.dept}
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

export default UserProfile;
