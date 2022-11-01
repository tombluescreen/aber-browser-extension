
function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		console.log("Item created successfully");
	}
}

browser.menus.create({
	id: "idlookup",
	title: "Module Lookup",
	contexts: ["selection"]
}, onCreated);


var nextModule;
// var modules;
// let openNotis = [];
// let notiCounter = 0;


browser.menus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case "idlookup":
			//sendNotification(info.selectionText.toUpperCase().trim())
			nextModule = info.selectionText.trim()
			browser.browserAction.openPopup();
			
			break;
	}
});

// function sendNotification(foundid) {
// 	const foundMod = getModule(foundid);

// 	let title = "";
// 	let content = "";
// 	let mixedData = {};

// 	if (foundMod == null) {
// 		console.log(foundid + " returned null")
// 		title = "Sorry I couldn't find anything";
// 		mixedData = {id:notiCounter}
		
// 	} else {
// 		title = foundMod["id"] + " - " + foundMod["title"];
// 		content = "https://www.aber.ac.uk/en/modules/" + foundMod["url"];
// 		mixedData = {id:notiCounter, url:("https://www.aber.ac.uk/en/modules/" + foundMod["url"])}
// 	}
	
// 	browser.notifications.create({
// 		"type": "basic",
// 		"iconUrl": browser.extension.getURL("aberlogo.png"),
// 		"title": title,
// 		"message": content
// 	});
	
// 	openNotis.push(mixedData);
// 	notiCounter++;
// }

// function loadModules() {
// 	fetch(browser.extension.getURL("optislimALL.json")).then(r => r.text()).then(result => {
// 		// Result now contains the response text, do what you want...
// 		console.log(result)
// 		modules = JSON.parse(result);
// 	})
// }

// function getModule (id) {
// 	for (const mod of modules["modules"]) {
// 		if (id == mod["id"]) {
// 			lastModule = mod;
// 			return mod;
// 		}
// 	}
// }



// function resolveDept(mod) {
// 	return modules["depts"][mod["dept"]];
// }

// browser.notifications.onClicked.addListener((notificationId) => {
// 	console.log(openNotis)
// 	for (var i = 0; i < openNotis.length; i++) {
// 		let noti = openNotis[i]
// 		console.log(noti)
// 		if (noti["id"] == notificationId) {
// 			console.log("Noti Recognised")
// 			console.log(noti["url"])
// 			browser.tabs.create({"url": noti["url"]})
// 		}
// 	}
// });

// browser.notifications.onClosed.addListener((notificationId) => {
// 	console.log(openNotis)
// 	for (var i = 0; i < openNotis.length; i++) {
// 		let noti = openNotis[i]
// 		console.log(noti)
// 		if (noti["id"] == notificationId) {
// 			openNotis.splice(i,1)
// 		}
// 	}
// });


function connectListener(port) {
	console.log("Connected .....");

      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg);
		   if (msg.substring(0,13) == "readyForModID") {
				port.postMessage(nextModule);
				nextModule = null
		   }
           
      });
	
}

var popup = browser.runtime.onConnect.addListener(connectListener)