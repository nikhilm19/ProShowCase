/* eslint-disable no-use-before-define */

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { action } from "@storybook/addon-actions";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FilterProjects from "../components/FilterProjects";
import "../styles/tailwind.css";
const addIcon = <AddIcon fontSize="small" />;
const removeIcon = <RemoveIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxesTags = () => {
  return (
    <FilterProjects>
      <div className="flex flex-col sm:flex-row w-full">
        <div className="sm:w-3/12 mr-4 mb-2 sm:mb-0">
          <Autocomplete
            multiple
            limitTags={2}
            id="checkboxes-tags-demo"
            options={technologies}
            disableCloseOnSelect
            onChange={(e, newValue) => {
              console.log(newValue);
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
        <div className="sm:w-5/12 mr-4 mb-2 sm:mb-0">
          <Autocomplete
            multiple
            id="guides"
            limitTags={2}
            options={guides}
            disableCloseOnSelect
            onChange={(e, newValue) => {
              console.log(newValue);
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
        <div className="sm:w-3/12 w-1/2">
          <Autocomplete
            multiple
            id="batch"
            limitTags={2}
            options={batches}
            disableCloseOnSelect
            onChange={(e, newValue) => {
              console.log(newValue);
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
      </div>
    </FilterProjects>
  );
};

const technologies = [
  { title: "AI", year: 1994 },
  { title: "ML", year: 1972 },
  { title: "WEB", year: 1974 },
  { title: "ANDROID", year: 2008 },
];
const guides = [
  { name: "Dhatri Pandya", year: 1994 },
  { name: "Pariza Kambhoj", year: 1972 },
  { name: "Nirali Nanavati", year: 1974 },
];
const batches = [{ year: "2019" }, { year: "2020" }, { year: "2021" }];
export default {
  title: "Tags",
  component: CheckboxesTags,
};
CheckboxesTags.story = {
  name: "Tags",
};
