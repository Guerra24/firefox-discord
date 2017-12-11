const DiscordRPC = require("discord-rpc");
//DiscordRPC.register('388699573834743808');
const client = new DiscordRPC.Client({ transport: "ipc" });
const parse = require("parse-duration");
const moment = require("moment");
const express = require('express');
const app = express();

app.use(express.json());

function setRP(type, tabTitle, tabURL, iconName) {
    // if(type === 'idle') {
    //     client.setActivity({
    //         details: `${tabTitle}`,
    //         state: `${tabURL}`,
    //         startTimestamp: moment(new Date()).add(parse("-0s"), "ms").toDate(),
    //         largeImageKey: 'firefox-large',
    //         instance: false,
    //     })
    // } else {
        if(type === 'normal') {
            if(iconName) {
                client.setActivity({
                    details: `Browsing ${tabTitle}`,
                    state: `On ${tabURL}`,
                    startTimestamp: moment(new Date()).add(parse("-0s"), "ms").toDate(),
                    largeImageKey: `${iconName}`,
                    smallImageKey: 'firefox-small',
                    smallImageText: 'Firefox',
                    instance: false,
                })
            } else {
                client.setActivity({
                    details: `Browsing ${tabTitle}`,
                    state: `On ${tabURL}`,
                    startTimestamp: moment(new Date()).add(parse("-0s"), "ms").toDate(),
                    largeImageKey: 'firefox-large',
                    largeImageText: 'Firefox',
                    instance: false,
                })
            }
        }
    //}
};  

client.on("ready", () => {
    console.log("Logged in with RPC!");
    setRP('normal', 'Idle', 'Firefox');
});

app.post('/setRP', (req, res) => {
    if(req.body.iconName) {
        setRP('normal', req.body.tabTitle, req.body.tabURL, req.body.iconName)
    } else {
        setRP('normal', req.body.tabTitle, req.body.tabURL)
    }
    // res.send({
    //     status: 'success',
    //     data: {
    //         tabURL: req.body.tabURL,
    //         tabTitle: req.body.tabTitle
    //     }
    // });
    console.log(req.body)
});

app.listen(1337, () => console.log('Example app listening on port 1337!'));
client.login('388699573834743808').catch(console.error);