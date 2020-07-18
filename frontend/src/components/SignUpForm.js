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
import { connect } from "react-redux";
import axios from "axios";

import Loader from "./Loader";
import { signUpUser } from "../actions";
import Snackbar from "./Snackbar";
class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGuide: props.isGuide,
      isLoading: false,
      error: "",
      user: {
        userId: null,
        enrolmentNo: null,
        name: "",
        email: "",
        password: "",
      },
    };
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

  onFormSubmit = async (event) => {
    //todo make api call to localhost:4000/users/
    event.preventDefault();
    console.log("hello ");

    const enrolmentNo = this.state.user.enrolmentNo;
    let user = this.state.user;
    user.id = enrolmentNo;

    console.log(enrolmentNo);

    this.setState({
      user,
      isLoading: true,
    });

    console.log(this.state);
    const { cookies } = this.props;

    this.props.signUpUser(user, cookies);

    if (!this.props.isAuthenticated) {
      this.setState({
        error: this.props.message,
      });
    }

    /*axios
      .post("http://localhost:4000/users", this.state.user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/
  };

  render() {
    return (
      <div className="signup-form-container container border-b">
        <div className="signup-form-content flex flex-col sm:flex-row   ">
          <div className="signup-form-content--left w-full sm:w-7/12">
            <div className="signup-form-content--left container">
              <div className="signup-form-content--left-content border-r-2 border-solid border-gray-500  h-0 sm:h-full">
                <img
                  src="/images/undraw_access_account_99n5.png"
                  className=""
                ></img>
              </div>
            </div>
          </div>

          <div className="signup-form-content--right flex-1 bg-gray-100 p-4 justify-center">
            <div className="about-info">
              <div className="text-center mb-4 mt-4">
                <Typography variant="h4">ProShowCase</Typography>
              </div>
            </div>
            <div className="flex mt-4">
              <form validate onSubmit={this.onFormSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  onChange={this.handleInputChange}
                />

                <div className="flex flex-row ">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    helperText={
                      this.state.error !== null ? this.state.error : ""
                    }
                    onChange={this.handleInputChange}
                    autoFocus
                    validate
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    onChange={this.handleInputChange}
                    autoFocus
                  />
                </div>
                {this.state.isGuide === false ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="roll"
                    label="Enrolment Number"
                    name="enrolmentNo"
                    autoFocus
                    onChange={this.handleInputChange}
                  />
                ) : (
                  ""
                )}

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

                <div className="w-5/12 h-12">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="h-full"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Loader isLoading={this.state.isLoading} />
        {this.props.isSignupAttempt && !this.props.isAuthenticated ? (
          <Snackbar text={this.props.message} type="error" />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mastatetoprops signup");
  console.log(state);
  return {
    isSignupAttempt: state.authReducer.isSignupAttempt,
    currentUser: state.authReducer.currentUser,
    message: state.authReducer.message,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};
export default connect(mapStateToProps, { signUpUser })(SignupForm);
