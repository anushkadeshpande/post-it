import React from 'react'
import { Link, useParams } from 'react-router-dom'
const { ipcRenderer } = window.require("electron");

const SelectTheme = () => {
    let { projectId } = useParams();
  
    const setTheme =(themeId) => {

        let returnVal = ipcRenderer.sendSync("set-theme", [projectId, themeId]);
    }
  return (
    <div className='selectTheme'>
    <div onClick={() => {setTheme("Theme1")}}>Theme1</div>
    <div onClick={() => {setTheme("Theme2")}}>Theme2</div>
    <div onClick={() => {setTheme("Theme3")}}>Theme3</div>
    <div onClick={() => {setTheme("Theme4")}}>Theme4</div>
    <div onClick={() => {setTheme("Theme5")}}>Theme5</div>
    </div>
  )
}

export default SelectTheme