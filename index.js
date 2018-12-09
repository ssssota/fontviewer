const {app, BrowserWindow, NativeImage} = require('electron')

let window

const createWindow = () => {
    if (window) return

    window = new BrowserWindow({
        'width': 1280,
        'height': 720,
        'minWidth': 640,
        'minHeight': 360,
        'icon': './src/icon256.png'
    })
    window.loadFile('src/index.html')
    if (process.argv[2] === '--debug') window.webContents.openDevTools()
    window.on('closed', () => {
        window = null
    })
}

app.on('ready', createWindow)
app.on('activate', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
