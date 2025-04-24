/**
 * @file main.js
 * @author typedef
 * @title consteliaxo
 * @description constelia.ai launcher/hub.
 */
const {
    app,
    BrowserWindow
} = require('electron');

/**
 * useful to automatically reload the page instead of having to relaunch the application per edit to index.html
 * only needed for debug development
 */
const path = require('path');
require('electron-reload')(path.normalize(path.join(__dirname, '../../src/index.html')), { electron: path.join(__dirname, '../../node_modules', '.bin', 'electron') });


let window = null;

/**
 * main
 *
 * create our browser window
 */
function main()
{
    window = new BrowserWindow({
        width: 1024,
        height: 800,
        //alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    /**
     * hide the menu bar
     */
    window.setMenuBarVisibility( false );

    /**
     * window created, let's load our html file now.
     */
    window.loadFile('src/index.html');
}

/**
 * instance
 * @type {boolean}
 */
const instance = app.requestSingleInstanceLock();
if (!instance) {
    app.quit();
} else {
    app.on('second-instance', () => {
        // Someone tried to run a second instance, we should focus our window.
        if (window) {
            if (window.isMinimized()) window.restore();
            window.focus();
        }
    });

    app.whenReady().then(() => {
        main();
    });
}