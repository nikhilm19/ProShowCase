import React from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

import Users from "../apis/user"
import Loader from "./Loader";
class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
  }
  async componentDidMount() {
    const data = await Users.get("/160420107030");
    const user = data.data.user;
    this.setState({
      user,
    });
  }

  renderUser = () => {
    if (this.state.user === null) {
      return <Loader isLoading={true} />;
    } else
      return (
        <div>
          <div>
            <img
              src="/images/user-profile-bg.jpg"
              className="w-11/12 h-64 mx-auto"
            />
          </div>

          <div className="z-10">
            <div className="w-full ">
              <Avatar className=" mx-auto -mt-8 ">NV</Avatar>
              <h1 className="text-3xl w-full text-center ">
                {this.state.user.name}
              </h1>
              <h1 className="text-xl w-auto text-center">
                Email: {this.state.user.email}
              </h1>
            </div>
          </div>

          <div className="mx-auto w-full flex flex-col justify-center">
            <h1 className="text-xl w-auto text-center">
              Roll No: {this.state.user.enrollment_no}
            </h1>
            <h1 className="text-xl w-auto text-center">
              Department: {this.state.user.dept}
            </h1>
            <h1 className="text-xl w-auto text-center">
              Grad Year: {this.state.user.grad_year}
            </h1>
            <h1 className="text-xl w-auto text-center">
              UserName: {this.state.user.username}
            </h1>
          </div>
        </div>
      );
  };
  render() {
    return this.renderUser();
  }
}

export default UserProfile;
