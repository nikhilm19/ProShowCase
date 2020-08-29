import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Loader from "../components/Loader/Loader";
import logoGif from "../logos/Purple Rectangles Attorney & Law Logo (1).gif";

export default {
  title: "Loader",
  component: Loader,
};

export const SimpleBackdrop = (args) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: args.color,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={args.open}
        onClick={handleClose}
      >
        <img src={logoGif} width={args.width} height={args.height} />
      </Backdrop>
    </div>
  );
};

export const loader = SimpleBackdrop.bind({});

loader.args = {
  width: "100px",
  height: "100px",
  open: true,
  color: "rgba(136, 135, 133, 0.17)",
};
