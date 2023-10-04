const server = require('./server');
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const Store = require('electron-store');
const store = new Store();
const contextMenu = require('electron-context-menu');
let mainWindow
if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1200,
    frame: false,
    minWidth: 1200, 
    minHeight: 750,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
      
    },
  });

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadFile('index.html')
  
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()

  ipcMain.on('get-app-info', (event) => {
    event.returnValue = {
      path: app.getAppPath(),
      appData: app.getPath('appData')
      
      // Agrega cualquier otra información que necesites aquí
    };
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    app.whenReady().then(() => {
      createWindow()})
    }

  
})



ipcMain.on('app-quit', (evt, arg) => {
  app.quit()
})


ipcMain.on('app-reload', (event, arg) => {
  mainWindow.reload();
});



contextMenu({
  prepend: (params, browserWindow) => [
     
      {label: 'DevTools',
       click(item, focusedWindow){
        focusedWindow.toggleDevTools();
      }
    },
     { 
      label: "Reload", 
        click() {
          mainWindow.reload();
      } 
    // },
    // {  label: 'Quit',  click:  function(){
    //    mainWindow.destroy();
    //     mainWindow.quit();
    // } 
  }  
  ],

});

 

 