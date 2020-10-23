// TODO: Recreate UI
// TODO: Move key txt files into a database format
// TODO: Add support for multiple keys
// TODO: Message encryption, decryption

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

function setupApplication () {
  try {
    const { ENVIRONMENT } = require('../electron-pgp/env.js')
  } catch (e) {
    const environmentArgument = process.argv[process.argv.length - 1]
    if (environmentArgument === 'production' || environmentArgument === 'development') {
      // Set environment
      const js = `
  /*** AUTO GENERATED ENVIRONMENT FILE DO NOT EDIT ***/
  module.exports.ENVIRONMENT = '` + environmentArgument + `';
  module.exports.ENVIRONMENT_CREATION_DATETIME = '` + new Date() + `';
  /*** VARIABLES MUST BE ACCESSED USING ES6 MODULE SYNTAX ***/
  `
      fs.writeFile('env.js', js, function (err) {
        if (err) throw new Error('error setting environment: fatal')
      })
    } else {
      throw new Error('argument must be either: production or development on first run,' +
        'subsequent runs do not require the argument, and it can be set again by using the argument')
    }
  }

  const keysDir = './src/keys';

  if (!fs.existsSync(keysDir)){
    try {
      fs.mkdirSync(keysDir);
    } catch (error) {
      alert('Failed to create keys directory.')
      console.log(error)
    }
  }

}

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname + '/src/controllers/', 'preload.js'),
    },
  })

  // Window settings.
  mainWindow.setResizable(false)

  // and load the index.html of the app.
  mainWindow.loadFile('src/templates/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

setupApplication()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
