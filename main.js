const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

const iconName = path.join(__dirname, "json-file.png");

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on("onDragStart", (event, filePath) => {
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: iconName,
  });
});

ipcMain.on("onDropped", (event, filePath) => {
  fs.readFile(filePath, (error, data) => {
    // Parse file contents
    const obj = JSON.parse(data);
    // Send result back to renderer process
    win.webContents.send("fromDropped", obj);
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
