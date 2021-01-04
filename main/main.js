// Native
const { format } = require("url");

// Packages
const { join, isAbsolute, normalize } = require("path");
const { resolve } = require("app-root-path");

const { BrowserWindow, app } = require("electron");
const prepareNext = require("./prepareNext");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./", 8000);

  const mainWindow = new BrowserWindow({
    width: 360,
    height: 720,
    x: 12,
    y: 32,
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

  const url = devPath;
  mainWindow.loadURL(url);
  process.env.DEBUG && mainWindow.openDevTools({ mode: "undocked" });
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
