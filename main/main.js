// Native
const { format } = require("url");
const { join } = require("path");

// Packages
const { BrowserWindow, app } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const { resolve } = require("app-root-path");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./", 8000);

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    frame: false,
    transparent: true,
    acceptFirstMouse: true,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js"),
      // loader:
    },
  });

  const devPath = "http://localhost:8000/start";

  const prodPath = format({
    pathname: resolve("renderer/out/start/index.html"),
    protocol: "file:",
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  mainWindow.loadURL(url);
  mainWindow.openDevTools({ mode: "undocked" });
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
