import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch, connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getProfile } from "../actions/index";

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
  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated,
      });
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    const { component: Component, ...rest } = this.props;

    return this.state.isAuthenticated === true ? (
      <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
    ) : (
      <Route {...rest} render={(props) => <Redirect to="/login" />} />
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

export default connect(mapStateToProps)(PrivateRoute);
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
