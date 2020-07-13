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

import TeamMemberDialog from "../TeamMemberDialog";
import users from "../../apis/user";

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
    this.props.onSubmit(formProps,this.state.members,this.state.guide);
  };

  fetchUsers = async () => {
    const res = await users.get("/");
    //console.log("fetched users" + JSON.stringify(res.data));
    return res.data;
  };

  componentDidMount() {
    this.fetchUsers();
  }

  renderTeam = (members, guide) => {
    return (
      <div class=" px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Your Team
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            The doers, the developers!
          </p>
        </div>

        <div className="flex mx-auto justify-center">
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src="https://dummyimage.com/80x80"
              />
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">{guide}</h2>
                <p class="text-gray-500">The guide!</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -m-2 justify-center">
          {members.map((member) => {
            return (
              <div className="m-2 w-3/12">
                <Card className="flex flex-col">
                  <CardHeader
                    className="flex flex-col"
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    title={member}
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Built the UI!
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing></CardActions>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  onAddMember = (members) => {
    this.setState({
      members,
    });
  };

  onAddGuide = (guide) => {
    this.setState({
      guide,
    });
  };
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="w-auto flex justify-center flex-col p-8">
          <div className="flex flex-col ">
            <div className="flex flex-row ">
              <div className="m-2">
                <TeamMemberDialog
                  dialogTitle="Add Guide"
                  isMultiple={false}
                  dialogText="Please add your guide here"
                  onAddMember={this.onAddGuide}
                />
              </div>

              <div className="m-2">
                {/*<Field
                  component={TeamMemberDialog}
                  {...{
                    dialogTitle: "Add Team Member",
                    isMultiple: true,
                    fetchUsers: { this.fetchUsers},
                    dialogText: "Please add your teammate here",
                    onAddMember: { onAddMember },
                  }}
                />*/}
                <TeamMemberDialog
                  dialogTitle="Add Team Member"
                  isMultiple={true}
                  fetchUsers={this.fetchUsers}
                  dialogText="Please add your teammate here"
                  onAddMember={this.onAddMember}
                />
              </div>
            </div>
          </div>

          {this.state.members !== null ? (
            <div className="w-full">{this.renderTeam(this.state.members)}</div>
          ) : (
            ""
          )}

          <div className="mt-8">
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "CreateProject",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Team);
