const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  infoOS: () => ipcRenderer.invoke('info:os'),
  infoCPU: () => ipcRenderer.invoke('info:cpu'),
  infoMemory: () => ipcRenderer.invoke('info:memory')
})