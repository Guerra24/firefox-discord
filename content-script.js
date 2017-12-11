const Tab = browser.tabs.query({active: true, currentWindow: true});
var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", "http://localhost:1337/setRP");
xmlhttp.send(JSON.stringify({ 'tabURL': Tab.tabURL, 'tabTitle': Tab.tabTitle }));
console.log(xmlhttp.DONE)