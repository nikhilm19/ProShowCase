import React from "react";
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";

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
function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <div className="h-auto">
          <Route
            render={(props) =>
              5 === 5 ? (
                <div>
                  <HeaderM>
                    <Switch>
                      <Route exact path="/" component={Landing} />

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
                          <UserProfileTabs isGuide={false} {...props} />
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

export default App;
