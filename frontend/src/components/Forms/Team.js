import React from "react";

import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import renderField from "../renderField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { connect } from "react-redux";

import { getProfile } from "../../actions";
import TeamMemberDialog from "../TeamMemberDialog";
import users from "../../apis/user";
import GoogleAvatar from "../GoogleAvatar/GoogleAvatar";
import Loader from "../Loader/Loader";

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: null,
      guide: null,
    };
  }

  onSubmit = (formProps) => {
    console.log(formProps);
    this.props.onSubmit(formProps, this.state.members, this.state.guide,this.props.currentUser.batch);
  };

  fetchUsers = async (type) => {
    const res = await users.get(`/?type=${type}`);
    //console.log("fetched users" + JSON.stringify(res.data));
    return res.data;
  };

  componentDidMount() {
    this.fetchUsers();
  }

  renderTeam = (members, guide) => {
    return (
      <div class=" px-5 py-10 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Your Team
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            The doers, the developers!
          </p>
        </div>
        {guide !== null ? (
          <div className="flex mx-auto justify-center">
            <div class="p-2  md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-200 border rounded-lg">
                <img
                  alt="team"
                  class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/80x80"
                />
                <div class="flex-grow">
                  <h2 class="text-gray-900 title-font font-medium">
                    {guide.name}
                  </h2>
                  <p class="text-gray-500">The guide!</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {members !== null ? (
          <div class="flex flex-wrap -m-2 justify-center">
            {members.map((member) => {
              return (
                <div className="m-2 sm:w-3/12 w-full">
                  <Card className="flex flex-col">
                    <CardHeader
                      className="flex flex-col"
                      style={{ margin: "0px" }}
                      avatar={<GoogleAvatar text={member.name[0]} />}
                      title={member.name}
                    />

                    <CardContent>
                      <h1 className="text-gray-500 text-center">
                        {member.email}
                      </h1>
                    </CardContent>
                    <CardActions disableSpacing></CardActions>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  onAddMember = (members) => {
    console.log(members);
    this.setState({
      members: members,
    });
    console.log(this.state);
  };

  onAddGuide = (guide) => {
    this.setState({
      guide,
    });
    console.log(this.state);
  };
  render() {
    const { handleSubmit } = this.props;
    console.log(this.props.currentUser);

    return this.props.currentUser === undefined ? (
      <Loader isLoading={true} />
    ) : (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="w-auto flex justify-center flex-col">
          <div className="flex flex-col ">
            <div className="flex flex-row ">
              <div className="mr-2">
                <TeamMemberDialog
                  dialogTitle="Add Guide"
                  type="guide"
                  fetchUsers={this.fetchUsers}
                  isMultiple={false}
                  defaultValue={this.props.currentUser}
                  dialogText="Please add your guide here"
                  onAddMember={this.onAddGuide}
                  label="Email Address"
                />
              </div>

              <div className="">
                <TeamMemberDialog
                  dialogTitle="Add Team Member"
                  isMultiple={true}
                  type="student"
                  defaultValue={this.props.currentUser}
                  fetchUsers={this.fetchUsers}
                  dialogText="Please add your teammate here"
                  onAddMember={this.onAddMember}
                  label="Email Address(es)"
                />
              </div>
            </div>
          </div>

          {this.state.members !== null ? (
            <div className="w-full">
              {this.renderTeam(this.state.members, this.state.guide)}
            </div>
          ) : (
            ""
          )}

          <div className="mt-8">
            <Button variant="outlined" color="secondary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    currentUser: state.authReducer.currentUser,
  };
};
Team = connect(mapStateToProps, {})(Team);

export default reduxForm({
  form: "CreateProject",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Team);
