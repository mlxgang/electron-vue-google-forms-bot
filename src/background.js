import {
  app, BrowserWindow, ipcMain, protocol,
} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV !== 'production';

// process.env.PLAYWRIGHT_BROWSERS_PATH = 0;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function botBrowser() {
  const winBot = new BrowserWindow({
    width: 1280,
    height: 755,
    frame: false,
    resizable: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
      // devTools: false,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await winBot.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) winBot.webContents.openDevTools();
  } else {
    createProtocol('app');
    winBot.loadURL('app://./index.html');
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) botBrowser();
});

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  botBrowser();
});

ipcMain.on('auth', (event) => {
  console.log(event);
  const browserWindow = BrowserWindow.fromWebContents();
  browserWindow.setSize(133, 755);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
