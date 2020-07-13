import React, { Component } from "react";
import { DropzoneDialog, DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import { imageUpload } from "../actions/index";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
    };
  }
  handleChange = (files) => {
    this.setState({
      files: files,
    });
    this.props.imageUpload(files);
    this.props.input.onChange(files);
  };

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div>
        <DropzoneArea
          dropzoneText="Drop your implementation snaps here!"
          useChipsForPreview
          previewGridProps={{ container: { spacing: 1, direction: "row" } }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    files: state.imageFiles,
  };
};

export default connect(mapStateToProps, { imageUpload })(ImageUpload);
