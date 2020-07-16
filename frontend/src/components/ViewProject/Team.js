import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";

import Divider from "@material-ui/core/Divider";

import ShadowBox from "../Shadow";

const useStyles = makeStyles({
  root: {
    width: "auto",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "row",
  },
  actionArea: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flexGrow: 1,
    flexWrap: "wrap",
  },
  media: {
    height: "200px",
    width: "200px",

    flexGrow: 2,
  },
});
const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4",
];

export default function Team(props) {
  const { project } = props;

  return (
    <section class="text-gray-700 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="text-2xl font-medium title-font mb-4 text-gray-900">
            OUR TEAM
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
           We made it for the world!
          </p>
        </div>
        <div class="flex flex-wrap -m-4 flex-col">
          <div class="p-4 lg:w-1/2 mb-6 w-auto mx-auto rounded">
            <ShadowBox>
              <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  class="flex-shrink-0 rounded-lg w-64 h-50 lg:w-48 lg:h-48 object-cover object-center sm:mb-0 mb-4"
                  src={"https://dummyimage.com/200x200"}
                />
                <div class="flex-grow sm:pl-8">
                  <h2 class="title-font font-medium text-lg text-gray-900">
                    {project.guide}
                  </h2>
                  <h3 class="text-gray-500 mb-3">{project.guide}</h3>
                  <p class="mb-4">
                    <a href={"mailto:" + project.guide}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EmailIcon />}
                      >
                        Send Email
                      </Button>
                    </a>
                  </p>
                </div>
              </div>
            </ShadowBox>
          </div>
          <div class="flex flex-wrap -m-4 justify-center">
            {project.teamMembers.map((member) => {
              return (
                <div class="p-4 lg:w-1/4 md:w-1/2">
                  <ShadowBox>
                    <div class="h-full flex flex-col items-center text-center">
                      <img
                        alt="team"
                        class="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                        src="https://dummyimage.com/202x202"
                      />
                      <div class="w-full">
                        <h2 class="title-font font-medium text-lg text-gray-900">
                          {member}
                        </h2>
                        <h3 class="text-gray-500 mb-3">{member}</h3>
                        <p class="mb-4">
                          <a href={"mailto:" + member}>
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<EmailIcon />}
                            >
                              Send Email
                            </Button>
                          </a>
                        </p>
                      </div>
                    </div>
                  </ShadowBox>
                </div>
              );
            })}
          </div>

         
        </div>
      </div>
    </section>
  );
}
