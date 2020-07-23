import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { connect } from "react-redux";

import { signInUser } from "../actions/index";
import Loader from "./Loader";

import Shadow from "./Shadow";
import UserProfileTabs from "./UserProfileTabs";
import history from "../history";
import Snackbar from "./Snackbar";
class loginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGuide: props.isGuide,
      isLoading: false,
      user: {
        username: "",

        password: "",
      },
    };
    const { cookies } = this.props;
    console.log(this.props);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };

  onFormSubmit = (event) => {
    //todo make api call to localhost:4000/users/
    event.preventDefault();
    let user = this.state.user;

    console.log(this.state);

    this.props.signInUser(user);
    console.log(this.props);

    if (this.props.isAuthenticated) {
      this.setState({
        user: this.props.currentUser,
        isLoading: false,
      });

      this.props.history.push("/profile");
    } else {
      this.setState({
        user: null,
        isSignedIn: false,
        isLoading: true,
        loginError: this.props.message,
      });
    }

    console.log(this.state);

    // console.log(this.props.authStatus);
  };

  render() {
    return (
      <div className="login-form-container  border-b w-full h-full ">
        <div className="login-form-content flex flex-col sm:flex-row h-full ">
          <div className="login-form-content--left w-full sm:w-7/12 lg:w-7/12 h-0 sm:h-full border-r-2 border-solid  border-gray-500 flex justify-center items-center">
            <div className="login-form-content--left container h-0 sm:h-full">
              <div className="login-form-content--left-content h-full">
                <img
                  src="/images/undraw_access_account_99n5.png"
                  className=""
                ></img>
              </div>
            </div>
          </div>
          <div className="login-form-content--right sm:w-5/12 w-full flex flex-col flex-1 bg-gray-100 pt-8 justify-start items-center ">
            <div className="flex justify-center flex-col h-full items-center">
              <div className="about-info ">
                <div className="text-center mb-4 mt-4 w-full">
                  <h1 className="text-4xl font-title text-purple-700">
                    ProShowCase✨
                  </h1>
                </div>
              </div>
              <div className="flex mt-4 w-full">
                {" "}
                <form
                  validate
                  onSubmit={this.onFormSubmit}
                  className="w-full mx-8 "
                >
                  <div className="flex flex-row ">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Email Address"
                      name="username"
                      type="email"
                      autoComplete="email"
                      onChange={this.handleInputChange}
                      autoFocus
                      validate
                    />
                  </div>

                  <div className="flex flex-row ">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="w-full mt-2 sm:w-8/12 h-12">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="h-full"
                      style={{
                        fontFamily: ["Heebo"],
                      }}
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Loader isLoading={this.state.isLoading} />
        {this.props.isLoginAttempt && !this.props.isAuthenticated ? (
          <Snackbar
            key={this.props.isSignupAttempt}
            text={this.props.message}
            type="error"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mastatetoprops");
  console.log(state);
  return {
    currentUser: state.authReducer.currentUser,
    message: state.authReducer.message,
    isAuthenticated: state.authReducer.isAuthenticated,
    isLoginAttempt: state.authReducer.isLoginAttempt,
  };
};
export default connect(mapStateToProps, { signInUser })(loginForm);
