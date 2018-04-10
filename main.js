const path = require('path');
const {app, nativeImage, Menu, Tray} = require('electron');
const express = require('./server.js'); // your express app

// Electron

let tray = null;

app.on('ready', () => {
	const contextMenu = Menu.buildFromTemplate([
		{
			label : 'Quit',
			click : () => {
				express.server.close();
				app.quit();
			}
		},
	]);
	const iconPath = path.join(__dirname, 'assets/icon-16.png');
	const trayIcon = nativeImage.createFromPath(iconPath);
	tray = new Tray(trayIcon);

	tray.setToolTip('Firefox Discord Rich Presence');
	tray.setContextMenu(contextMenu);
});