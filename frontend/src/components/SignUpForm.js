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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
      isSignupAttempt: this.props.isSignupAttempt,
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

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.setState({
        error: null,
        isSignupAttempt: false,
      });
      this.props.history.push("/profile");
    }
  }

  onFormSubmit = async (event) => {
    //todo make api call to localhost:4000/users/
    this.setState({
      isOpen: false,
    });
    this.setState({ error: null, isLoading: false });
    event.preventDefault();
    console.log("hello ");

    const enrolmentNo = this.state.user.enrolmentNo;
    let user = this.state.user;
    user.id = enrolmentNo;
    user.type = this.state.isGuide ? "guide" : "student";

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
        isLoading: false,
      });
    }
  };

  render() {
    const departments = [
      {
        value: "CO",
        label: "CO",
      },
      {
        value: "IT",
        label: "IT",
      },
      {
        value: "MCA",
        label: "MCA",
      },
      {
        value: "EE",
        label: "EE",
      },
      {
        value: "EC",
        label: "EC",
      },
      {
        value: "IC",
        label: "IC",
      },
      {
        value: "TT",
        label: "TT",
      },
      {
        value: "CH",
        label: "CH",
      },
    ];
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

          <div className="signup-form-content--right flex-1 bg-gray-100 p-4 justify-center pl-16">
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
                  <div className="flex-1 w-1/2 mr-4">
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
                      onChange={this.handleInputChange}
                      autoFocus
                      validate
                    />
                  </div>
                  <div className="flex-1 w-1/2 ">
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
                </div>

                <div className="flex flex-row w-full">
                  <div className="flex-1 w-1/2 mr-4">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="phone"
                      label="Contact"
                      type="text"
                      id="Contact"
                      style={{ marginRight: "4px" }}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="flex-1 w-1/2 justify-center items-center ">
                    <TextField
                      id="standard-select-currency"
                      select
                      fullWidth
                      required
                      name="dept"
                      margin="normal"
                      label="Department"
                      value={this.state.user.dept}
                      onChange={this.handleInputChange}
                      variant="outlined"
                    >
                      {departments.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
                {this.state.isGuide === false ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="roll"
                    label="Enrolment Number"
                    name="enrollment_no"
                    autoFocus
                    onChange={this.handleInputChange}
                  />
                ) : (
                  ""
                )}

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
