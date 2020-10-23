const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

function setupApplication () {
  try {
    const { ENVIRONMENT } = require('../src/env.js')
  } catch (e) {
    const environmentArgument = process.argv[process.argv.length - 1] === 'development'
      ? 'development'
      : 'production'

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
  }

  const keysDir = './src/keys'

  if (!fs.existsSync(keysDir)) {
    try {
      fs.mkdirSync(keysDir)
    } catch (error) {
      alert('Failed to create keys directory.')
      console.log(error)
    }
  }

}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'templates/index.html'))
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

setupApplication()

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
