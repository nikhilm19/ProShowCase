import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";

import history from "../history";
import Loader from "./Loader/Loader";
import { signUpUser } from "../actions";
import Snackbar from "./Snackbar/Snackbar";
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
      formValidation: {
        enrollment_no: { isValid: true },
        email: { isValid: true },
        password: { isValid: true },
        phone: { isValid: true },
        grad_year: { isValid: true },
      },
      isValid: true,
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
      history.push("/profile");
    }
  }

  componentDidUpdate(prevProps) {
    console.log("ComponentDidUpdate - SignupForm ----->");

    console.log(this.props);
    console.log(prevProps);
    if (!(this.props.isAuthenticated === prevProps.isAuthenticated)) {
      if (!this.props.isAuthenticated) {
        this.setState({
          error: this.props.message,
          isLoading: false,
        });
      } else {
        this.props.history.push("/Profile");
      }
    }
  }

  isValid = (user) => {
    console.log(user);
    let error = this.state.formValidation;
    var isValid = true;
    if (user.enrollment_no.length !== 12 && user.type === "student") {
      error.enrollment_no.text = "Enrolment number should be 12 digits long";
      error.enrollment_no.isValid = false;
      isValid = false;
    }
    if (user.phone.length !== 10) {
      error.phone.text = "Phone number should be 10 digits long";
      error.phone.isValid = false;
      isValid = false;
    }
    if (user.password.length <= 6) {
      error.password.text = "Password should be atleast 6 char long";
      error.password.isValid = false;
      isValid = false;
    }

    console.log(error);

    this.setState({ formValidation: error, isValid: isValid });
    return isValid;
  };

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

    const isValid = this.isValid(this.state.user);

    console.log(this.state);
    if (isValid) {
      const { cookies } = this.props;
      this.props.signUpUser(user, cookies);
      if (!this.props.isAuthenticated) {
        this.setState({
          error: this.props.message,
          isLoading: false,
        });
      }
    } else {
      this.setState({
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
      <div className="signup-form-container  border-b h-full">
        <div className="signup-form-content flex flex-col sm:flex-row  h-full p-4 sm:p-0 bg-gray-100 sm:bg-white">
          <div className="signup-form-content--left w-full sm:w-7/12 h-full">
            <div className="signup-form-content--left container h-full">
              <div className="signup-form-content--left-content border-r-2 border-solid border-gray-500  h-0 sm:h-full w-0 sm:w-full">
                <img
                  src="/images/undraw_access_account_99n5.png"
                  className=""
                ></img>
              </div>
            </div>
          </div>

          <div className="signup-form-content--right sm:w-5/12 w-full flex flex-col flex-1 bg-gray-100 pt-16 justify-start items-center ">
            <div className="about-info">
              <div className="text-center">
                <h1 className="text-4xl font-title text-purple-700">
                  ProShowCase✨
                </h1>
              </div>
            </div>
            <div className="flex mt-2 justify-center w-full">
              <form
                validate
                onSubmit={this.onFormSubmit}
                className="flex justify-center flex-col"
              >
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
                      error={!this.state.formValidation.email.isValid}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      helperText={this.state.formValidation.email.text}
                      label="Email Id"
                      name="email"
                      autoComplete="email"
                      type="email"
                      onChange={this.handleInputChange}
                      validate
                    />
                  </div>
                  <div className="flex-1 w-1/2 ">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      error={!this.state.formValidation.password.isValid}
                      required
                      helperText={this.state.formValidation.password.text}
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
                      error={!this.state.formValidation.phone.isValid}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      helperText={this.state.formValidation.phone.text}
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
                  <div className="flex flex-row w-full">
                    <div className="flex-1 w-1/2 justify-center items-center mr-4">
                      {" "}
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        error={!this.state.formValidation.enrollment_no.isValid}
                        fullWidth
                        id="roll"
                        label="Enrolment No."
                        helperText={
                          this.state.formValidation.enrollment_no.text
                        }
                        name="enrollment_no"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="flex-1 w-1/2 justify-center items-center ">
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        error={!this.state.formValidation.grad_year.isValid}
                        fullWidth
                        type="number"
                        id="grad_year"
                        label="Batch of "
                        helperText={this.state.formValidation.grad_year.text}
                        name="grad_year"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="w-full mt-2 sm:w-5/12 h-12">
                  <button class="font-buttons w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-3 md:text-lg ">
                    Signup
                  </button>
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
