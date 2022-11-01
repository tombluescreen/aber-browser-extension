
var moduleDisplayHTML = '<div class="moduleHolder">\n<div class="text italic title"><span id="idout" class="noitalic">{0}</span> - <span id="titleout" class="noitalic">{1}</span></div>\n<div class="text italic">Dept: <span id="deptout" class="noitalic">{2}</span></div>\n<div class="text italic">URL: <a id="urlout" class="noitalic" href="{3}">{4}</a></div>\n</div>'
var emptyDisplayHTML = '<div class="text emptymodules">No results ¯\\_(ツ)_/¯</div>'
var firstuse = '<div class="text help"><span>Enter a search query or</span>\n<span>right click on selected text</span>\n<span>to search</span></div>'

modules = {}
function loadModules(callback) {
	fetch(browser.runtime.getURL("optislimALL.json")).then(r => r.text()).then(result => {
		// Result now contains the response text, do what you want...
		console.log(result)
		modules = JSON.parse(result);
        callback();
	})
}

function resolveDept(mod) {
	return modules["depts"][mod["dept"]];
}


function filldatapopup(mod) {
    if ((mod == null) || (mod =="null")) {
        return;
    }
    localStorage.setItem("oldMod",mod.id);

    idout = document.getElementById("idout")
    titleout = document.getElementById("titleout")
    urlout =  document.getElementById("urlout")
    deptout =  document.getElementById("deptout")

    idout.innerText = mod["id"]
    titleout.innerText = mod["title"]
    urlout.innerText = mod["url"]
    urlout.href = "https://www.aber.ac.uk/en/modules/" + mod["url"]
    deptout.innerText = resolveDept(mod)
}

function getModule (id) {
	for (var mod of (modules.modules)) {
		if (id == mod["id"]) {
			return mod;
		}
	}
}

function searchModules(term) {
    localStorage.setItem("oldMod",term);
    searchList = []
    if ((term == null) || (term == "") || (term == " ")) {
        return []
    }
	for (const mod of modules["modules"]) {
		var search_res = (mod["id"] + " " + mod["title"] + " " + resolveDept(mod)).toUpperCase().search(term.trim().toUpperCase());
		//console.log(search_res + " " + mod["id"])
        if (search_res != -1) {
			searchList.push(mod)
		}
    }
    return searchList;
}

function displayMultilpeModules(modules) {

    modulescroll = document.getElementById("modulescroll")
    modulescroll.innerHTML = "";
    if (modules.length == 0) {
        var obj = $.parseHTML(emptyDisplayHTML);
        var firstuseobj = $.parseHTML(firstuse);
        $(modulescroll).append(obj)
        $(modulescroll).append(firstuseobj)
    }

    
    
    for (const mod of modules) {
        var egg = replaceStrings(moduleDisplayHTML, [mod.id, mod.title, resolveDept(mod), "https://www.aber.ac.uk/en/modules/" + mod["url"], mod["url"]])
        var obj = $.parseHTML(egg)
        $(modulescroll).append(obj)
    }
}


function replaceStrings(input, args) {
    var counter = 0;
    for (const n of args) {
        input = input.replace(`{${counter}}`, n)
        counter++;
    }
    return input;
}

function searchBtnClicked() {
    console.log("SENT")
    idtext = document.getElementById("idin").value
    console.log(idtext)
    displayMultilpeModules(searchModules(idtext))
    //filldatapopup(getModule(idtext))
}



window.onload = function(){
    loadModules(() => {
        const localresult = localStorage.getItem("oldMod");
        displayMultilpeModules(searchModules(localresult))
        document.getElementById("idin").value = localresult
        //filldatapopup(getModule(localresult));
        

        var port = browser.runtime.connect({
            name: "Sample Communication"
        });
        port.postMessage("readyForModID");
        port.onMessage.addListener(function(msg) {
                console.log("message recieved" + msg);
                if (msg != null) {
                    displayMultilpeModules(searchModules(msg))
                    document.getElementById("idin").value = msg
                }
        });

        document.getElementById('searchbtn').onclick = searchBtnClicked;
        
        document.getElementById("idin").addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                searchBtnClicked();
            }
        });
    })
    
    
}

