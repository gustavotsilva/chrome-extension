importScripts('./securityRules.js');

let activeTabId, previousUrl, lastUrl, lastTitle;

function runChromeScript(tabId){
    chrome.scripting.executeScript({
        target: {
            tabId: tabId
        },
        function: applySecurityRules,
    });
}

function getTabInfo(tabId) {
	chrome.tabs.get(tabId, function(tab) {
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