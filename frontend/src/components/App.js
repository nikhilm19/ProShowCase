import React from "react";
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
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
      isOpen: false,
    };
    const { cookies } = this.props;

    this.props.getProfile(cookies);

    console.log(this.props);

    if (this.props.currentUser !== undefined) {
      this.setState({
        isOpen: true,
      });
      if (this.props.currentUser.type === "guide") {
        this.setState({
          isGuide: true,
        });
      }
    } else {
    }
    this.setState({
      isGuide: false,
    });

    //cookies.set("name", "hello", { path: "/" });
  }

  async componentDidMount() {
    //console.log("in APP" + this.props);
  }

  renderRedirect = ({ history }) => {
    if (
      this.props.isAuthenticated === false &&
      !(
        history.location.pathname.startsWith("/signup") ||
        history.location.pathname.startsWith("/login")
      )
    ) {
      return <Redirect to="/" />;
    }
  };
  render() {
    console.log(this.props);

    return (
      <div className="App ">
        <Router history={history}>
          <div className="h-auto">
            <Route
              render={(props) => (
                <div>
                  <HeaderM {...props} {...this.props}>
                    {this.renderRedirect(props)}
                    <Switch>
                      <Route
                        exact
                        path="/"
                        component={() =>
                          this.props.isAuthenticated ? (
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
                        component={() => (
                          <SignUpForm
                            isGuide={false}
                            {...props}
                            {...this.props}
                          />
                        )}
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
                        component={() => (
                          <CreateProject {...props} {...this.props} />
                        )}
                      />
                      <Route
                        exact
                        path={`/project/view/:project_id`}
                        component={ViewProject}
                      />
                    </Switch>
                  </HeaderM>
                </div>
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.authReducer.currentUser,
    message: state.authReducer.message,
    authStatus: state.authReducer.authStatus,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { getProfile })(withCookies(App));
