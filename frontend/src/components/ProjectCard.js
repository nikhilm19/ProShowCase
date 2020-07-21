import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import Skeleton from "@material-ui/lab/Skeleton";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

import Chip from "./Chip";

const images = [
  "/images/undraw_our_solution_htvp.png",
  "/images/undraw_product_tour_foyt.png",
  "images/undraw_project_completed_w0oq.png",
  "/images/undraw_code_typing_7jnv.png",
];
const faces = ["NM", "KK", "SJ", "PR"];

const styles = (muiBaseTheme) => ({
  card: ({ inactive }) => ({
    maxWidth: 350,

    transition: "0.3s",
    boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
    transition: "0.3s",
    ...(!inactive && {
      "&:hover": {
        transform: "translateY(-3px)",
        backgroundColor: "#5b48f0",
        boxShadow: "0 16px 70px -12.125px #1d00ff",
        color: "white",
        "& .MuiButton-label": {
          color: "black",
        },
        "& .MuiButton-root": {
          backgroundColor: "white",
        },
      },
    }),
  }),
  media: {
    cursor: "pointer",
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    paddingLeft: muiBaseTheme.spacing.unit * 2,
    paddingRight: muiBaseTheme.spacing.unit * 2,
    paddingBottom: `0px`,
    fontFamily: ["Heebo"],
    lineHeight: 1,
  },
  actions: {
    marginLeft: `${muiBaseTheme.spacing.unit * 1}px`,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 1}px 0`,
  },
  heading: {
    fontWeight: "bold",
    fontFamily: ["Heebo"],
  },
  subheading: {
    lineHeight: 0.5,
  },
  avatar: {
    backgroundColor: deepPurple[300],

    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
});

function Project({ classes, project, history, isLoading }) {
  return (
    <div className="">
      <Card className={classes.card}>
        {isLoading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            onClick={() =>
              history.push({
                pathname: `project/view/${project._id}`,
                project: project,
              })
            }
            className={classes.media}
            image={images[Math.floor(Math.random() * images.length)]}
          />
        )}

        <CardContent
          className={classes.content}
          onClick={() => history.push(`project/view/${project._id}`)}
        >
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              height={10}
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              {project.title}
            </Typography>
          )}
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              height={10}
              width={"60%"}
              style={{ marginBottom: 6 }}
            />
          ) : (
            <div className="flex flex-col">
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                {project.brief}{" "}
              </Typography>
              <div className="flex flex-row">
                {project.technologies.slice(0, 4).map((tech) => {
                  return <Chip label={tech.title} />;
                })}
              </div>
            </div>
          )}

          <Divider className={classes.divider} light />
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              width={"100%"}
              height={40}
            />
          ) : (
            <div className="flex flex-row">
              <AvatarGroup max={3}>
                {project.teamMembers.map((face) =>
                  isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={40}
                      height={40}
                    />
                  ) : face.name ? (
                    <Avatar className={classes.avatar} key={face.name}>
                      {face.name[0]}
                    </Avatar>
                  ) : (
                    ""
                  )
                )}
              </AvatarGroup>
            </div>
          )}
        </CardContent>
        <CardActions className={classes.actions}>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              width={"30%"}
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={() =>
                history.push({
                  pathname: `project/view/${project._id}`,
                  project: project,
                })
              }
            >
              View
            </Button>
          )}

          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              width={"10%"}
              style={{ marginBottom: 6 }}
            />
          ) : (
            <IconButton color="primary" onClick={() => history.push("/he;lo")}>
              <ShareIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

const ProjectCard = withStyles(styles)(Project);
export default ProjectCard;
