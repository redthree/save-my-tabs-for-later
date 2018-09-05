document.addEventListener('DOMContentLoaded', function () {
	var respMessage = document.getElementById('respMessage');
	
	chrome.storage.sync.get(['tabsArr'], function(result){
		
		if(result.tabsArr !== undefined){

			respMessage.innerHTML = '<button id="restoreTabs">Restore tabs</button><br/><button id="clearTabs">Clear Tabs</button>';
			
			var btnRestoreTabs = document.getElementById('restoreTabs');
			var btnClearTabs = document.getElementById('clearTabs');
			
			btnRestoreTabs.addEventListener('click', function(){
				result.tabsArr.forEach(function(tab){
					chrome.tabs.create({
						url: tab.url
					});
				});
			});

			btnClearTabs.addEventListener('click', function(){
				chrome.storage.sync.remove('tabsArr', function(){
					respMessage.innerHTML = 'Tabs cleared';
				});
			});

		} else {
			respMessage.innerHTML = '<button id="saveTabs">Save my tabs</button>';

			var btnSaveTabs = document.getElementById('saveTabs');

			btnSaveTabs.addEventListener('click', function(){
				chrome.tabs.query({currentWindow: true}, function(tabs){
					chrome.storage.sync.clear(null);
					chrome.storage.sync.set({'tabsArr': tabs}, function(){
						respMessage.innerHTML = 'Tabs saved!';
					});
				});
			});
		}
	});
	
});