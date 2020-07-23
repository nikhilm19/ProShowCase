import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FilterProjects from "../components/FilterProjects";

export default {
  title: "Hello",
  component: FilterProjects,
};


export const Card = () => {
  return <FilterProjects />;
};
export const Text = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "80%",
      backgroundColor: "gray",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Accordion className={classes.root}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export const Emoji = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);


