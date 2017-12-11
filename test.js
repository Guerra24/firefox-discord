const http = require('snekfetch');
http.post('http://localhost:1337/setRP',)
.send({ 'tabURL': 'https://google.com', 'tabTitle': 'Google' })
.end();