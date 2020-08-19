import React from "react";
import Button from "@material-ui/core/Button";
import Chip from "../Chip/Chip";
import ShadowBox from "../Shadow/Shadow";
class ProjectAbstract extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.project_id);
  }
  render() {
    const { project } = this.props;
    return (
      <section class="text-gray-700 body-font">
        <div class="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
          <img
            class="lg:w-2/6 md:w-3/6 w-5/6 mb-5 object-cover object-center rounded"
            alt="hero"
            src="/images/undraw_project_completed_w0oq.png"
          />
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {project.title}
            </h1>
            <p class="mb-8 leading-relaxed">{project.brief}</p>
            <div className="-mt-4 mb-8 flex flex-row justify-center">
              {project.technologies.map((tech) => {
                return <Chip label={tech.title} />;
              })}
            </div>
            <div class="flex justify-center">
              <div className="inline-flex text-white  border-0 py-2 px-3 focus:outline-none  rounded text-lg">
                <ShadowBox>
                  <a href={project.githubRepo} target="_blank">
                    <Button color="primary" variant="contained">
                      View
                    </Button>
                  </a>
                </ShadowBox>
              </div>

              <div className="inline-flex text-white  border-0 py-2 px-3 focus:outline-none  rounded text-lg">
                <ShadowBox>
                  <a href={project.demo} target="_blank">
                    <Button color="primary" variant="outlined">
                      Try it out
                    </Button>
                  </a>
                </ShadowBox>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProjectAbstract;
