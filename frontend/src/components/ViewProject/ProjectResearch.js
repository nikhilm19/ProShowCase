import React from "react";
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
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from "react-router-dom";

import ShadowBox from "../Shadow";

class ProjectResearch extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.project_id);
  }
  render() {
    if (this.props.project !== null) {
      const { publishedPapers, referenceMaterial } = this.props.project;
      return (
        <section class="text-gray-700 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="text-center mb-10">
              <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Project Research
              </h1>
              <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                The papers published!
              </p>
            </div>
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              {publishedPapers.map((paper) => {
                return (
                  <div class="p-2 sm:w-1/2 w-full">
                    <div class="bg-gray-200 rounded flex p-4 h-full items-center">
                      <IconButton aria-label="delete" color="secondary">
                        <LaunchIcon />
                      </IconButton>
                      <span class="title-font font-medium">{paper}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div class="text-center mt-20 mb-10">
              <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                References
              </p>
            </div>
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              {referenceMaterial.map((material) => {
                return (
                  <div class="p-2 sm:w-1/2 w-full">
                    <ShadowBox>
                      <div class="bg-gray-200 rounded flex p-4 h-full items-center">
                        <a href={"https://asdasd.com"} target="_blank">
                          <IconButton aria-label="delete" color="secondary">
                            <LaunchIcon />
                          </IconButton>
                        </a>
                        <span class="title-font font-medium">{material}</span>
                      </div>
                    </ShadowBox>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }
  }
}

export default ProjectResearch;
