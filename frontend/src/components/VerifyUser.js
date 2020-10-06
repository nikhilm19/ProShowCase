import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../apis/auth";


class VerifyUser extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      userId: null,
      error: null,
    };
  }

  async componentDidMount() {
    // this.fetchProject();
    console.log(this.props.match.params.token);
    const res = await auth.get(`/verify?id=${this.props.match.params.token}`);

    console.log(res);

    if (res.data) {
      if (res.data.success === true) {
        this.props.history.push("/profile");
      } else {
        this.setState({
          error: res.data.error.message,
        });
      }
    }
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div className="flex justify-center items-center h-64 flex-col">
        {this.state.error === null ? "Please wait" : this.state.error}

        <div class="mt-3 sm:mt-0 sm:ml-3 w-1/4 mt-4">
          <Link to="/login">
            <button class="font-buttons w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
              Try Logging in !
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default VerifyUser;
