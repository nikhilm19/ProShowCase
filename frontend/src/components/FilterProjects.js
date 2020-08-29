import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FilterIcon from "@material-ui/icons/FilterList";
import Chip from "./Chip/Chip";

const addIcon = <AddIcon fontSize="small" />;
const removeIcon = <RemoveIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "none",
    borderBottom: "1px solid #667eea",
    position: "sticky",
    borderTop: "none",
    "& .MuiPaper-outlined": {
      boxShadow: "none",
      backgroundColor: "red",
    },
  },

  paper: {
    backgroundColor: "red",
  },
  content: {
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    width: "min-content",
  },
  expand: {
    transform: "rotate(0deg)",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {},
  avatar: {
    backgroundColor: red[500],
  },
}));

const technologies = [
  { title: "AI" },
  { title: "ML" },
  { title: "Webapp" },
  { title: "ANDROID" },
  { title: "IOT" },
  { title: "NLP" },
];
const guides = [
  { name: "Dhatri Pandya", email: "dhatri.pandya@scet.ac.in" },
  { name: "Pariza Kambhoj", email: "xyz@scet.ac.in" },
  { name: "Nirali Nanavati", email: "pk@scet.ac.in" },
];
const batches = [{ year: "2019" }, { year: "2020" }, { year: "2021" }];

// fetch data here

export default function FilterProjects(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [selectedGuides, setSelectedGuides] = React.useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = React.useState([]);
  const [selectedBatches, setSelectedBatches] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto overflow-visible sticky">
      <button
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        className=" rounded p-2 px-4 text-black sticky mr-auto"
      >
        <FilterIcon />
        Filter
      </button>
      <Card
        className={classes.root}
        variant="outlined"
        square={true}
        classes={{
          root: classes.root, // class name, e.g. `classes-nesting-root-x`
          paper: classes.paper, // class name, e.g. `classes-nesting-label-x`
        }}
      >
        <Collapse in={expanded} timeout="auto" className={classes.content}>
          <CardContent className={classes.content}>
            <Typography paragraph>Technologies:</Typography>
            <div className="flex flex-col sm:flex-row w-full">
              <div className="sm:w-4/12 mr-4 mb-2 sm:mb-0 h-12">
                <Autocomplete
                  multiple
                  limitTags={2}
                  options={technologies}
                  disableCloseOnSelect
                  onChange={(e, newValue) => {
                    setSelectedTechnologies(newValue);
                    console.log(selectedTechnologies);
                  }}
                  getOptionLabel={(option) => option.title}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Technologies"
                      placeholder="Choose technologies"
                    />
                  )}
                />
              </div>
              <div className="sm:w-3/12 mr-4 mb-2 sm:mb-0 ">
                <Autocomplete
                  multiple
                  id="guides"
                  limitTags={2}
                  options={guides}
                  disableCloseOnSelect
                  onChange={(e, newValue) => {
                    setSelectedGuides(newValue);
                    console.log(selectedGuides);
                  }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={addIcon}
                        checkedIcon={removeIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Guides"
                      placeholder="Choose guide"
                    />
                  )}
                />
              </div>
              <div className="sm:w-3/12 mr-4">
                <Autocomplete
                  multiple
                  id="batch"
                  limitTags={2}
                  options={batches}
                  disableCloseOnSelect
                  onChange={(e, newValue) => {
                    setSelectedBatches(newValue);
                    console.log(selectedBatches);
                  }}
                  getOptionLabel={(option) => option.year}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={addIcon}
                        checkedIcon={removeIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.year}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Batch"
                      placeholder="Choose batch"
                    />
                  )}
                />
              </div>
              <button
                className="sm:w-2/12 bg-indigo-600 rounded text-white mx-auto h-12"
                onClick={() => {
                  props.getFilteredProjects(
                    selectedGuides,
                    selectedTechnologies,
                    selectedBatches
                  );
                }}
              >
                Submit
              </button>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
