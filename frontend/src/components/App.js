import React from "react";
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies, Cookies, CookiesProvider } from "react-cookie";
import cookie from "react-cookie";

import SignUpUserChoice from "./SignUpUserChoice";
import SignUpForm from "./SignUpForm";
import Header from "./Header";
import HeaderM from "./Headerm";
import history from "../history";
import UserProfileTabs from "./UserProfileTabs";
import CreateProject from "../components/CreateProject";
import Landing from "./Landing";
import AllProjects from "./AllProjects";
import ViewProject from "./ViewProject";
import Login from "./Login";
import LoginForm from "./LoginForm";
import { signInUser, getProfile } from "../actions/index";
import Loader from "./Loader";
import ShadowBox from "./Shadow";
import Snackbar from "./Snackbar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGuide: false,
      isOpen: true,
    };

    //cookies.set("name", "hello", { path: "/" });
  }

  async componentDidMount() {
    const cookies = this.props.cookies;

    this.props.getProfile(cookies);

    console.log(this.props);

    if (this.props.currentUser && this.props.currentUser.type === "guide")
      this.setState({
        isGuide: true,
        isOpen: true,
      });

    //console.log("in APP" + this.props);
  }
  render() {
    console.log(this.props);

    return (
      <div className="App">
        <BrowserRouter history={history}>
          <div className="h-auto">
            <Snackbar />
            <Route
              render={(props) =>
                5 === 5 ? (
                  <div>
                    <HeaderM {...props} {...this.props}>
                      <Switch>
                        <Route
                          exact
                          path="/"
                          component={() =>
                            this.props.currentUser ? (
                              <AllProjects {...props} />
                            ) : (
                              <Landing {...props} />
                            )
                          }
                        />
                        <Route
                          exact
                          path="/login"
                          component={() => (
                            <LoginForm
                              cookies={this.props.cookies}
                              {...props}
                              {...this.props}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/signup"
                          component={SignUpUserChoice}
                        />
                        <Route
                          exact
                          path="/signup/guide"
                          component={() => <SignUpForm isGuide={true} />}
                        />
                        <Route
                          exact
                          path="/signup/student"
                          component={() => <SignUpForm isGuide={false} />}
                        />
                        <Route
                          exact
                          path="/profile"
                          component={() => (
                            <UserProfileTabs
                              isGuide={false}
                              {...this.props}
                              {...props}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/All-Projects"
                          component={() => <AllProjects {...props} />}
                        />

                        <Route
                          exact
                          path="/project/new"
                          component={() => <CreateProject />}
                        />
                        <Route
                          exact
                          path={`/project/view/:project_id`}
                          component={ViewProject}
                        />
                      </Switch>
                    </HeaderM>
                  </div>
                ) : (
                  <div>
                    <Route exact path="/" component={Header} />
                    <Switch>
                      <Route exact path="/" component={SignUpUserChoice} />
                      <Route
                        exact
                        path="/signup/guide"
                        component={() => <SignUpForm isGuide={true} />}
                      />
                      <Route
                        exact
                        path="/profile"
                        component={() => <UserProfileTabs isGuide={false} />}
                      />
                      <Route
                        exact
                        path="/signup/student"
                        component={() => <SignUpForm isGuide={false} />}
                      />
                    </Switch>
                  </div>
                )
              }
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.authReducer.currentUser,
    message: state.authReducer.message,
    authStatus: state.authReducer.authStatus,
    isAuthenticated: state.authReducer.success,
  };
};

export default connect(mapStateToProps, { getProfile })(withCookies(App));
