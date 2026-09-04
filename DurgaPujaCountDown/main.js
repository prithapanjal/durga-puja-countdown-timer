
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {

  const win = new BrowserWindow({

    width: 292,
    height: 430,

    resizable: false,
    maximizable: false,
    fullscreenable: false,

    frame: false,
    transparent: false,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }

  });

  win.loadFile(path.join(__dirname, "index.html"));


  // Minimize
  ipcMain.on("window-minimize", () => {
    win.minimize();
  });


  // Close
  ipcMain.on("window-close", () => {
    win.close();
  });

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {

  if (process.platform !== "darwin") {
    app.quit();
  }

});

