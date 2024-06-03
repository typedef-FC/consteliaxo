const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    'api', {
        quitApp: () => ipcRenderer.send('quit-app')
    }
)