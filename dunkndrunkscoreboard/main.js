const { app, BrowserWindow, session } = require('electron');
const path = require('path');
// RISOLUZIONE CRASH GPU (Fondamentale per Windows/VM)
app.disableHardwareAcceleration();
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1200, height: 800,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  const isProd = app.isPackaged || __dirname.includes('.asar');
  const indexPath = isProd
    ? path.join(__dirname, 'dist', 'dunkndrunkscoreboard', 'browser', 'index.html')
    : 'http://localhost:4200';
  isProd ? win.loadFile(indexPath) : win.loadURL(indexPath);

  win.on('closed', () => { win = null; });
}
app.on('ready', () => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on('window-all-closed', () => {
  session.defaultSession.clearCache().then(() => {
    if (process.platform !== 'darwin') {
      app.quit();
    }else{
      app.quit();
    }
  })
})