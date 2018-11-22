const { app, BrowserWindow,ipcMain, Menu, MenuItem } = require('electron')

let dev = process.argv.length==3 && process.argv[2]=='dev' || false;// || true 只是在非必须下方便调试

let initWin;
let mainWin;

function createWindow () {
  if (process.platform === 'darwin') {
    const template = [
      {
        label: "Edit",
        submenu: [
          {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
          },
          {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
          }
        ]
      }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
  initWin = new BrowserWindow({ width: 400, height: 250 })
  initWin.loadFile('view/index.html');
  if (dev) {
    initWin.webContents.openDevTools();
  }
  initWin.on('close',()=>{
    initWin.webContents.send('close-win', 'close daemon!');
    app.quit();
  })
  ipcMain.on('change-win', (event, arg) => {
    event.returnValue = 'done'
    initWin.hide();
    mainWin = new BrowserWindow({ width: 1000, height: 800 });
    mainWin.loadURL(arg)
    if (dev) {
      mainWin.webContents.openDevTools();
    }
    mainWin.on('close',()=>{
      initWin.webContents.send('close-win', 'close daemon!');
      app.quit();
    })
  })
  
}

app.on('ready', createWindow);