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
const images = [
  "/images/undraw_our_solution_htvp.png",
  "/images/undraw_product_tour_foyt.png",
  "images/undraw_project_completed_w0oq.png",
  "/images/undraw_code_typing_7jnv.png",
];
const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4",
];

const styles = (muiBaseTheme) => ({
  card: ({ inactive }) => ({
    maxWidth: 350,

    transition: "0.3s",
    boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
    transition: "0.3s",
    ...(!inactive && {
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
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
  },
  actions: {
    marginLeft: `${muiBaseTheme.spacing.unit * 1}px`,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 1}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid pink",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
});

function Project({ classes, project, history, isLoading }) {
  return (
    <div className="App">
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
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              {project.brief}{" "}
            </Typography>
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
            faces.map((face) =>
              isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="circle"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar
                  className={classes.avatar}
                  key={face}
                  src={face}
                ></Avatar>
              )
            )
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
            <Button size="small" color="primary">
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
