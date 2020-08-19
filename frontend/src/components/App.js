import React from "react";
import { Route, Link, Switch, HashRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies, Cookies, CookiesProvider } from "react-cookie";
import cookie from "react-cookie";

import SignUpUserChoice from "./SignUpUserChoice";
import SignUpForm from "./SignUpForm";

import HeaderM from "./Header";
import history from "../history";
import UserProfileTabs from "./UserProfileTabs";
import CreateProject from "../components/CreateProject";
import Landing from "./Landing";
import AllProjects from "./AllProjects";
import ViewProject from "./ViewProject";

import LoginForm from "./LoginForm";
import { signInUser, getProfile } from "../actions/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(window.location);
    this.state = {
      isGuide: false,
      isOpen: false,
    };
    const { cookies } = this.props;

    this.props.getProfile(cookies);

    console.log(this.props);

    if (this.props.currentUser !== undefined) {
      this.setState({
        isOpen: true,
        isGuide: this.props.currentUser.type === "guide" ? true : false,
      });
    } else {
    }

    //cookies.set("name", "hello", { path: "/" });
  }

  async componentDidMount() {
    //console.log("in APP" + this.props);
  }

  renderRedirect = () => {
    console.log(history);
    console.log(this.props);
    if (
      (this.props.isAuthenticated === undefined ||
        this.props.isAuthenticated === false) &&
      !(
        history.location.pathname.startsWith("/signup") ||
        history.location.pathname.startsWith("/login") ||
        history.location.pathname === "/"
      )
    ) {
      console.log("yes");
      return <Redirect to="/" />;
    }
  };
  render() {
    console.log(this.props);
    console.log(history);

    return (
      <div className="App ">
        <HashRouter history={history}>
          <div className="h-auto">
            <div>
              <HeaderM history={history}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() =>
                      this.props.isAuthenticated ? <AllProjects /> : <Landing />
                    }
                  />
                  <Route
                    exact
                    path="/login"
                    render={() => <LoginForm cookies={this.props.cookies} />}
                  />
                  <Route exact path="/signup" component={SignUpUserChoice} />
                  <Route
                    exact
                    path="/signup/guide"
                    render={() => <SignUpForm isGuide={true} />}
                  />
                  <Route
                    exact
                    path="/signup/student"
                    render={() => <SignUpForm isGuide={false} />}
                  />
                  <Route exact path="/profile" component={SignUpUserChoice} />
                  <Route
                    exact
                    path="/All-Projects"
                    render={() => <AllProjects />}
                  />

                  <Route
                    exact
                    path="/project/new"
                    render={() => <CreateProject />}
                  />
                  <Route
                    exact
                    path={`/project/view/:project_id`}
                    render={() => <ViewProject />}
                  />
                </Switch>
                <SignUpUserChoice />
              </HeaderM>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapstatetoprops-APp.js", state);
  return {
    currentUser: state.authReducer.currentUser,
    message: state.authReducer.message,
    authStatus: state.authReducer.authStatus,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { getProfile })(withCookies(App));
