function onError(error) {
	console.log(`Error: ${error}`);
}

function getTabJson(currentTab) {
	var response = {
		tabURL : currentTab.url,
		tabTitle : currentTab.title,
	};
	return JSON.stringify(response);
}

function sendData(tab) {
	if (tab.incognito)
		return;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:1337/setRP", true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.send(getTabJson(tab));
	// console.log(getTabJson(tab));
}
function handleActivated(activeInfo) {
	var tabq = browser.tabs.get(activeInfo.tabId);
	tabq.then(function(tab) {
		sendData(tab);
	});
}

function handleUpdated(tabId, changeInfo, tabInfo) {
	var tabq = browser.tabs.get(tabId);
	tabq.then(function(tab) {
		if (tab.active)
			sendData(tab);
	});
}

function handleFocus(windowId) {
	if (windowId < 0)
		return;
	var wq = browser.windows.get(windowId);
	wq.then(function(win) {
		if (win.focused) {
			var tabq = browser.tabs.query({active : true, currentWindow : true});
			tabq.then(function(rtab) {
				sendData(rtab[0]);
			});
		}
	});
}

browser.windows.onFocusChanged.addListener(handleFocus);
browser.tabs.onUpdated.addListener(handleUpdated);
browser.tabs.onActivated.addListener(handleActivated);