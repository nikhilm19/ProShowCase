import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch, connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getProfile } from "../actions/index";
import Loader from "./Loader/Loader";
import AllProjects from "./AllProjects";
import Landing from "./Landing";
class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
    };

    // this.props.getProfile((data) => {
    //   console.log("Inside getprofile callback");
    //   console.log(data);
    //   this.setState({ isAuthenticated: data.success });
    // });
  }
  componentDidMount() {
    if (localStorage.getItem("token")) this.props.getProfile(this.props);
    else this.setState({ isAuthenticated: false });
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props);
    if (this.props !== prevProps) {
      this.setState(
        {
          isAuthenticated: this.props.isAuthenticated,
        },
        () => console.log("updated state")
      );
      //this.renderLanding();
    }
  }

  renderLanding = () => {
    console.log(this.props.location, this.state);
    const { component: Component, ...rest } = this.props;
    if (
      (this.props.location.pathname === "/" &&
        this.state.isAuthenticated !== undefined) ||
      this.state.isAuthenticated !== null
    ) {
      if (this.state.isAuthenticated === true)
        return (
          <Route {...rest} render={(props) => <AllProjects {...props} />} />
        );
      else
        return <Route {...rest} render={(props) => <Landing {...props} />} />;
    } else
      return <Route {...rest} render={(props) => <Landing {...props} />} />;
  };

  render() {
    console.log(this.props);
    console.log(this.state);

    const { component: Component, ...rest } = this.props;

    //this.renderLanding();
    return this.state.isAuthenticated === undefined ||
      this.state.isAuthenticated === null ? (
      <Loader isLoading={true} />
    ) : this.state.isAuthenticated === true ? (
      this.props.location.pathname === "/" ? (
        <Route {...rest} render={(props) => <AllProjects {...props} />} />
      ) : (
        <Route
          {...rest}
          render={(props) => <Component {...props} {...rest} />}
        />
      )
    ) : this.props.location.pathname === "/" ? (
      <Route {...rest} render={(props) => <Landing {...props} />} />
    ) : (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{ pathname: "/login", state: { from: this.props.location } }}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapstatetoprops-PrivateRoute.js", state);
  return {
    currentUser: state.authReducer.currentUser,
    message: state.authReducer.message,
    authStatus: state.authReducer.authStatus,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { getProfile })(PrivateRoute);
// const PrivateRoute = async ({ component: Component, ...rest }) => {
//   const dispatch = useDispatch();

//   dispatch(getProfile);
//   const { isAuthenticated, currentUser } = useSelector(
//     (state) => ({
//       isAuthenticated: state.authReducer.isAuthenticated,
//       currentUser: state.authReducer.currentUser,
//     }),
//     shallowEqual
//   );
//   console.log("Inside protected route", isAuthenticated, currentUser);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated === true ? (
//           <Component {...props} {...rest} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
