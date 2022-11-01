function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		console.log("Item created successfully");
		
	}
}

chrome.contextMenus.create({
	"id": "idlookup",
	"title": "What is this",
	"contexts": ["selection"]
});

var modules;
let openNotis = [];
let notiCounter = 0;
loadModules();

chrome.contextMenus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case "idlookup":
			
			const foundMod = getModule(info.selectionText.toUpperCase().trim());

			let title = "";
			let content = "";

			if (foundMod == null) {
				console.log(info.selectionText.toUpperCase() + " returned null")
				title = "Sorry I couldn't find anything";
				
			} else {
				title = foundMod["id"] + " - " + foundMod["title"];
				content = "https://www.aber.ac.uk/en/modules/" + foundMod["url"];
			}
			
			chrome.notifications.create({
				"type": "basic",
				"iconUrl": chrome.runtime.getURL("aberlogo.png"),
				"title": title,
				"message": content
			});
			const mixedData = {id:notiCounter, url:("https://www.aber.ac.uk/en/modules/" + foundMod["url"])}
			openNotis.push(mixedData);
			notiCounter++;
			

			break;
	}
});

function loadModules() {
	fetch(chrome.runtime.getURL("optislimALL.json")).then(r => r.text()).then(result => {
		// Result now contains the response text, do what you want...
		console.log(result)
		modules = JSON.parse(result);
	})
}

function getModule (id) {
	for (const mod of modules["modules"]) {
		if (id == mod["id"]) {
			return mod;
		}
	}
}

function resolveDept(mod) {
	return modules["depts"][mod["dept"]];
}

chrome.notifications.onClicked.addListener((notificationId) => {
	console.log(openNotis)
	for (var i = 0; i < openNotis.length; i++) {
		let noti = openNotis[i]
		console.log(noti)
		if (noti["id"] == notificationId) {
			console.log("Noti Recognised")
			console.log(noti["url"])
			chrome.tabs.create({"url": noti["url"]})
		}
	}
});

chrome.notifications.onClosed.addListener((notificationId) => {
	console.log(openNotis)
	for (var i = 0; i < openNotis.length; i++) {
		let noti = openNotis[i]
		console.log(noti)
		if (noti["id"] == notificationId) {
			openNotis.splice(i,1)
		}
	}
});


