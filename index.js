const { app, BrowserWindow } = require('electron')



let dev = process.argv.length==3 && process.argv[2]=='dev';

let win;

function createWindow () {   
  win = new BrowserWindow({ width: 400, height: 250 })
  win.loadFile('view/index.html');
  if (dev) {
    win.webContents.openDevTools();
  }
}

app.on('ready', createWindow)