const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');
const si =require('systeminformation')
import os from 'os'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}





const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 680,
    maxWidth: 600, // Максимальная ширина окна
    maxHeight: 680, // Максимальная высота окна
    minWidth: 600, // Максимальная ширина окна
    minHeight: 680, // Максимальная высота окна
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    title: 'Системный Монитор', // Задаем заголовок окна
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  Menu.setApplicationMenu(null)
  
  ipcMain.handle('info:os', async () => {
    try {
      const data = await si.osInfo();
      console.log(data);
      return data; // Возвращаем данные
    } catch (error) {
      console.error(error);
      throw error; // Бросаем ошибку, чтобы обработать её на клиенте
    }
  });

  ipcMain.handle('info:cpu', async () => {
    try {
      const data = await si.cpu(); // Получаем данные о процессоре
      console.log(data);
      return data; // Возвращаем данные
    } catch (error) {
      console.error(error);
      throw error; // Бросаем ошибку
    }
  });
  

  ipcMain.handle('info:memory', async () => {
    try {
      const data = await si.mem(); // Получаем данные об оперативной памяти
      const memoryInGB = {
        total: (data.total / 1e9).toFixed(2), // Преобразуем в гигабайты
        free: (data.free / 1e9).toFixed(2),
        used: (data.active / 1e9).toFixed(2),
        // Добавьте другие параметры, если нужно
      };
      console.log(memoryInGB);
      return memoryInGB; // Возвращаем данные в гигабайтах
    } catch (error) {
      console.error(error);
      throw error; // Бросаем ошибку
    }
  });
  

  



  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
