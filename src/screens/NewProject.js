import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./NewProject.css";
const { ipcRenderer } = window.require("electron");

const NewProject = () => {
  let { projectId } = useParams();
  const [projectName, setProjectName] = useState(
    projectId !== "default" ? projectId : ""
  );

  const createProjectEntry = () => {
    // check if project already exists
    console.log(projectName);
    let projectObj = {};
    projectObj[projectName] = {};

    let returnVal = ipcRenderer.sendSync("create-project", projectObj);
    console.log(returnVal);
  };

  return (
    <div className="NewProject">
      <div className="NewProject__header">
        <p>What do you want to call your project?</p>
      </div>

      <div className="NewProject__content">
        <input
          type="text"
          placeholder="Enter the name of your project"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <div className="NewProject__content__buttons">
          <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

            <p>Cancel</p>
          </Link>
          <Link
            to={`/getContent/${projectName}`}
            onClick={() => {
              createProjectEntry();
            }}
          >
            <p>Next</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
