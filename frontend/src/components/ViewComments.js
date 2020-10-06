import React from "react";
import { getComments } from "../actions";
import { connect } from "react-redux";
import GoogleAvatar from "../components/GoogleAvatar/GoogleAvatar";

class ViewComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      error: null,
    };
  }

  componentDidMount() {
    this.props.getComments((data) => {
      if (data.success === true) {
        this.setState({
          comments: data.comments,
        });
      }
    }, this.props.match.params.project_id);
  }

  fetchComments = () => {
    if (this.props.isValid === true)
      this.props.getComments((data) => {
        if (data.success === true) {
          this.setState({
            comments: data.comments,
          });
        }
      }, this.props.match.params.project_id);
  };
  render() {
    this.fetchComments();
    console.log(this.state.comments);
    return (
      <div className="mt-8 w-full flex justify-center items-center flex-col">
        <div className="w-1/2">
          <h1 className="text-2xl text-gray-700 font-title mb-4">Comments</h1>
          {this.state.comments === null || this.state.comments.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center w-6/12 text-gray-600 text-xl">
                No Comments found :(
              </h1>
              <img src="/images/no-data.gif" />
            </div>
          ) : (
            this.state.comments.map(({ user, text, createdAt }) => (
              <div className="mb-2 group px-4 h-full flex flex-col  items-start text-center border-solid border-b-2 border-gray-200 animation-fadeInUp animation-1s  py-2 transition duration-700 ease-in-out  ">
                <div className="flex flex-row justify-start">
                  <div className="mb-2 mr-4">
                    {" "}
                    <GoogleAvatar text={user.name[0]} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                      {" "}
                      <h2 className="mr-2 m-0  text-gray-700 font-title transition duration-300 ease-in text-left ">
                        {user.name}
                      </h2>
                      <h1 className="m-0 text-xs text-left text-gray-400  transition duration-300 ease-in ">
                        {createdAt}
                      </h1>
                    </div>
                    <div className=" group w-full text-left flex flex-row">
                      <p className=" w-auto text-gray-600 text-xs">{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    comments: state.projectReducer.comments,
    error: state.projectReducer.error,
    success: state.projectReducer.success,
  };
};

export default connect(mapStateToProps, { getComments })(ViewComments);
