const electron = require('electron');
const fs = require('fs');
const app = electron.app;

let mainWindow = null;

function createWindow () {
  if (mainWindow !== null) {
    return;
  }

  mainWindow = new electron.BrowserWindow({
    width: 1000,
    height: 800,
    title: "Electron file association PoC",
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('activate', createWindow);
app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit();
  }
});

app.on('will-finish-launching', function() {
  let filePath;

  electron.ipcMain.on('get_opend_file', (event) => {
    if (filePath === undefined) {
      return;
    }

    event.returnValue = {
      path: filePath,
      content: fs.readFileSync(filePath, 'utf-8'),
    }
  });

  // for windows
  if (process.platform == 'win32' && process.argv.length >= 2) {
    filePath = process.argv[1];
  }
  
  // for non-windows
  app.on('open-file', function(event, path) {
    filePath = path;
  });
});
