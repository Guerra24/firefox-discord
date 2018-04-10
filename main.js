const {app, Menu, Tray} = require('electron');
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

	tray = new Tray('assets/icon-16.png');

	tray.setToolTip('Firefox Discord Rich Presence');
	tray.setContextMenu(contextMenu);
});