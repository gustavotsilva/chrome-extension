importScripts('./main.js');

let activeTabId, previousUrl, lastUrl, lastTitle;

function runChromeScript(tabId){
    chrome.scripting.executeScript({
        target: {
            tabId: tabId
        },
        function: run
    });
}

function getTabInfo(tabId) {
	chrome.tabs.get(tabId, function(tab) {
        if(tab.url.indexOf('chrome') != -1) return;
		if (lastUrl != tab.url || lastTitle != tab.title) {
            lastUrl = tab.url;
            if(lastUrl !== previousUrl) {
                console.log('🔎 ' + lastUrl);
            }
            previousUrl = lastUrl;
        }
        runChromeScript(tabId);
	});
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
	getTabInfo(activeTabId = activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    getTabInfo(tabId);
});