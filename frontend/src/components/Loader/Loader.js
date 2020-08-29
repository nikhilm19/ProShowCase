import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import logoGif from "../../logos/Purple Rectangles Attorney & Law Logo (1).gif";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(45, 30, 244, 0.1)",
  },
}));

export default function SimpleBackdrop(args) {
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
        open={args.isLoading}
        onClick={handleClose}
      >
        <img src={logoGif} width="100px" height="100px" />
      </Backdrop>
    </div>
  );
}
