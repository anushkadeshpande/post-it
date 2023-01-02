const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const { ipcMain } = require("electron");

const fs = require("fs");
//const path = window.require('path');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// defining apis
ipcMain.on("anything-synchronous", (event, arg) => {
  console.log(arg); // prints "ping"
  event.returnValue = "pong"; // returns a value to renderer process
});

ipcMain.on("fetch-projects", (event) => {
  fs.readFile("./src/res/projects.json", function (err, data) {
    // Check for errors
    if (err) throw err;

    // Converting to JSON
    const users = JSON.parse(data);

    console.log(users); // Print users
    event.returnValue = users;
  });
});

ipcMain.on("create-project", (event, arg) => {
  fs.readFile("./src/res/projects.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    var parsedData = JSON.parse(data);
    var flag = false;
    for (d in parsedData) {
      if (d === Object.keys(arg)[0]) {
        event.returnValue = "A project with this name already exists!";
        flag = true;
      }
    }
    if (!flag) {
      parsedData = { ...parsedData, ...arg };
      fs.writeFile(
        "./src/res/projects.json",
        JSON.stringify(parsedData, null, 2),
        (err) => {
          if (err) {
            event.returnValue = err
          }
        }
      );
      event.returnValue = parsedData;
    }
  });
});

function Project(arg0, arg1) {
  this.Object = arg0
this.slides = arg1
}

ipcMain.on("add-content", (event, arg) => {
  fs.readFile("./src/res/projects.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    var parsedData = JSON.parse(data);
    parsedData[arg[0]].slides = arg[1]
      fs.writeFile(
        "./src/res/projects.json",
        JSON.stringify(parsedData, null, 2),
        (err) => {
          if (err) {
            event.returnValue = err
          }
        }
      );
    
    event.returnValue = parsedData
 }
 );  
})

ipcMain.on("set-theme", (event, arg) => {
  fs.readFile("./src/res/projects.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    var parsedData = JSON.parse(data);
    parsedData[arg[0]].theme = arg[1]
      fs.writeFile(
        "./src/res/projects.json",
        JSON.stringify(parsedData, null, 2),
        (err) => {
          if (err) {
            event.returnValue = err
          }
        }
      );
    
    event.returnValue = parsedData
 }
 );  
})
