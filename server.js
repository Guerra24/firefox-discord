const parse = require('parse-duration');
const moment = require('moment');
const express = require('express');
const DiscordRPC = require('discord-rpc');
const client = new DiscordRPC.Client({transport : 'ipc'});
const app = express();

// Express server
app.use(express.json());

function setRP(type, tabTitle, tabURL, iconName) {
	if (type === 'normal') {
		if (iconName) {
			client.setActivity({
				details : `${tabTitle}`,
				state : `${tabURL}`,
				// startTimestamp: moment(new Date()).add(parse("-0s"), "ms").toDate(),
				largeImageKey : `${iconName}`,
				smallImageKey : 'firefox-small',
				smallImageText : 'Firefox',
				instance : false,
			})
		} else {
			client.setActivity({
				details : `${tabTitle}`,
				state : `${tabURL}`,
				// startTimestamp: moment(new Date()).add(parse("-0s"), "ms").toDate(),
				largeImageKey : 'firefox-large',
				largeImageText : 'Firefox',
				instance : false,
			})
		}
	}
};

app.post('/setRP', (req, res) => {
	if (req.body.iconName) {
		setRP('normal', req.body.tabTitle, req.body.tabURL, req.body.iconName)
	} else {
		setRP('normal', req.body.tabTitle, req.body.tabURL)
	}
	res.end();
});

var server = app.listen(1337, () => console.log('Express port: 1337'));

exports.server = server;

// Discord RDP

client.on('ready', () => {
	console.log('Logged in with RPC!');
	setRP('normal', 'Idle', 'Firefox');
});

client.login('433007687819853824').catch(console.error);