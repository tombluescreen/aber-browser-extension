
function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		console.log("Item created successfully");
	}
}

browser.menus.create({
	id: "idlookup",
	title: "What is this",
	contexts: ["selection"]
}, onCreated);

browser.menus.create({
	id: "test",
	title: "Run Dom check",
	contexts: ["selection"]
}, onCreated);

var modules;
let openNotis = [];
let notiCounter = 0;
loadModules();

browser.menus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case "test":
			let executing = browser.tabs.executeScript({
			    file: "replaceMods.js"
			  });
			 //executing.then(onExecuted);
			//console.log(info.selectionText);
			//console.log(modules[info.selectionText])
			//browser.tabs.sendMessage()
			break;
		case "idlookup":
			
			const foundMod = getModule(info.selectionText.toUpperCase());
			if (foundMod == null) {
				console.log(info.selectionText.toUpperCase() + " returned null")
				return;
			}
			let title = foundMod["id"] + " - " + foundMod["title"];
			let content = "https://www.aber.ac.uk/en/modules/" + foundMod["url"];
			let beans = browser.notifications.create({
				"type": "basic",
				"iconUrl": browser.extension.getURL("ic.png"),
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
	fetch(browser.extension.getURL("optislimALL.json")).then(r => r.text()).then(result => {
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

browser.notifications.onClicked.addListener((notificationId) => {
	console.log(openNotis)
	for (var i = 0; i < openNotis.length; i++) {
		let noti = openNotis[i]
		console.log(noti)
		if (noti["id"] == notificationId) {
			console.log("Noti Recognised")
			console.log(noti["url"])
			browser.tabs.create({"url": noti["url"]})
		}
	}
});
