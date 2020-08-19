import React from "react";
import {
  Route,
  Link,
  Switch,
  HashRouter as Router,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import SignUpUserChoice from "./SignUpUserChoice";
import SignUpForm from "./SignUpForm";
import Header from "./Header";
import history from "../history";
import UserProfileTabs from "./UserProfileTabs";
import CreateProject from "../components/CreateProject";
import Landing from "./Landing";
import AllProjects from "./AllProjects";
import ViewProject from "./ViewProject";
import LoginForm from "./LoginForm";
import { getProfile } from "../actions/index";

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
        <Router history={history}>
          <div className="h-auto">
            <div>
              <Header {...this.props} history={history}>
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
                    render={(props) => (
                      <LoginForm cookies={this.props.cookies} {...props} />
                    )}
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
                  <Route
                    exact
                    path="/profile"
                    render={(props) => (
                      <UserProfileTabs
                        {...this.props}
                        {...props}
                        isGuide={this.state.isGuide}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/All-Projects"
                    render={(props) => <AllProjects {...props} />}
                  />

                  <Route
                    exact
                    path="/project/new"
                    render={(props) => (
                      <CreateProject {...props} {...this.props} />
                    )}
                  />
                  <Route
                    exact
                    path={`/project/view/:project_id`}
                    render={(props) => (
                      <ViewProject {...props} {...this.props} />
                    )}
                  />

                  <Route path="*" component={Landing} />
                </Switch>
              </Header>
            </div>
          </div>
        </Router>
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
