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
  openWidget = () => {
    // create the widget
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dob7cybfl",
          uploadPreset: "ctfgyj5o",
          folder: "proshowcase",
          multiple: true,
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#FFFFFF",
              tabIcon: "#0078FF",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#1D194E",
            },
            fonts: {
              default: null,
              "'Fira Sans', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                active: true,
              },
            },
          },
        },
        (error, result) => {
          if (result.event === "success") {
            this.setState((prevState) => ({
              files: [
                ...prevState.files,
                {
                  imageUrl: result.info.secure_url,
                  imageAlt: `An image of ${result.info.original_filename}`,
                },
              ],
            }));

            this.props.imageUpload(this.state.files);
          }
        }
      )
      .open(); // open up the widget after creation
  };

  render() {
    const { files } = this.state;
    return (
      <div>
        <p>{files.length !== 0 ? files[0].secure_url : ""}</p>
        <Button variant="outlined" color="primary" onClick={this.openWidget}>
          Add Photos
        </Button>
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
