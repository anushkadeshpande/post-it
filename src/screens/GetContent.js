import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./GetContent.css";
const { ipcRenderer } = window.require("electron");

const GetContent = () => {
  const inputSection = useRef();
  const inputContent = useState([]);
  const [count, setCount] = useState(1);
  let { projectId } = useParams();

  const addField = (e) => {
    e.preventDefault();
    if (count < 10) {
      // let newIpLi = document.createElement("li");
      // let newIp = document.createElement("input");

      // newIpLi.appendChild(newIp);
      let newIp = ` <li class="GetContent__space__input"><input /><button onclick="e => addField(e)">+</button>
    </li>`;
      // inputSection.current.appendChild(newIpLi);
      inputSection.current.innerHTML += newIp
      setCount((prevVal) => prevVal + 1);
    } else window.alert("No more fields can be added");
  };

  const gatherContent = () => {
    var contentArr = inputSection.current.getElementsByTagName("li");
    var contents = [];
    for (var i = 0; i < contentArr.length; i++)
      contents.push(contentArr[i].getElementsByTagName("input")[0].value);

    let returnVal = ipcRenderer.sendSync("add-content", [projectId, contents]);
  };

  return (
    <div className="GetContent">
      <div className="GetContent__header">
        <p>Let’s add some content on the slides</p>
        <span>What do you want your carousel to talk about?</span>
      </div>
      <div className="GetContent__space">
        <ul ref={inputSection}>
          <li>
            <div className="GetContent__space__input"><input /><button onClick={(e) => addField(e)}>+</button></div>
          </li>
        </ul>
        
      </div>


      <div className="NewProject__content__buttons button_section">
        <Link
          to={"/new/" + projectId}
          onClick={() => {
            // createProjectEntry();
          }}
        >
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            style = {{transform: 'scale(-1,1)'}}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
          <p>Back</p>
        </Link>
        <Link to="/">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <p>Cancel</p>
        </Link>
        <Link
          to={`/getContent/${projectId}`}
          onClick={() => {
            // createProjectEntry();
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
  
  );
};

export default GetContent;
