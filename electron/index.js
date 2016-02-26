'use strict';
var electron = require('electron'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    Menu = electron.Menu,
    globalShortcut = electron.globalShortcut;

var mainWindow = null;

app.on('window-all-closed', function () {
    // force app termination on OSX when mainWindow has been closed
    if (process.platform == 'darwin') {
        app.quit();
    }
});

app.on('will-quit', function () {
    globalShortcut.unregisterAll();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        title: "BoardZ2",
        width: 1024,
        height: 768,
        nodeIntegration: false
    });

    globalShortcut.register('CmdOrCtrl+Shift+d', function () {
        mainWindow.webContents.toggleDevTools();
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setTitle(app.getName());

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    if (process.platform == 'darwin') {
        var template = [{
            label: "Application",
            submenu: [
                { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                { type: "separator" },
                {
                    label: "Reload", accelerator: "CmdOrCtrl+R", click: function () {
                    mainWindow.loadURL('file://' + __dirname + '/index.html');
                }
                },
                {
                    label: "Quit", accelerator: "Command+Q", click: function () {
                    app.quit();
                }
                }
            ]
        }, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }
        ];

        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    }
});
