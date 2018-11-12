const { app, BrowserWindow,ipcMain } = require('electron')



let dev = process.argv.length==3 && process.argv[2]=='dev' || false;// || true 只是在非必须下方便调试

let initWin;
let mainWin;

function createWindow () {   
  initWin = new BrowserWindow({ width: 400, height: 250 })
  initWin.loadFile('view/index.html');
  if (dev) {
    initWin.webContents.openDevTools();
  }
  ipcMain.on('change-win', (event, arg) => {
    event.returnValue = 'done'
    initWin.hide();
    mainWin = new BrowserWindow({ width: 1000, height: 800 });
    mainWin.loadURL(arg)
    if (dev) {
      mainWin.webContents.openDevTools();
    }
    mainWin.on('close',()=>{
      initWin.close();
    })
  })
  
}

app.on('ready', createWindow)