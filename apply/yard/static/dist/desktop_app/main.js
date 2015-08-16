'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 700,
        width: 700
    });

    mainWindow.loadUrl('file://' + __dirname + '/yard.html');
});
