

modules = {
  "beans": "EPIC",
  "CSD0720": "Finally",
  "CS22120":"HOLY SHIT",
  "CS11010": "In Header Test"
}


function sadge() {
	var beans = document.querySelectorAll("div")

	console.log(beans[0])
}

console.log("helloworld")
sadge()

/*
function replaceStuff() {
//window.eval()

  //let elements = Array.prototype.slice.call(document.querySelectorAll("p, header, div"));
  var ele = document.getElementsByTagName('body')[0].innerHTML;
  console.log(ele)
  
  var text = ele
  console.log("el")
  //const getModId = new RegExp("...[0-9]{4}")
  const getModId = new RegExp("[A-Z]{2}([A-Z]|[0-9])[0-9]{4}|[a-z]{2}([a-z]|[0-9])[0-9]{4}\D")	
  console.log(text)
	
	if (text.search(getModId) != -1){
		var indices = []
		var newIndex = 0;
		var lastIndex = 0
		while (newIndex != -1) {
			
			newIndex = text.substring(lastIndex).search(getModId);
			if (newIndex != -1) {
				indices.push(newIndex+lastIndex);
				//console.log("new: " + newIndex)
				console.log("Suspected Code: " + text.substring(lastIndex).substring(newIndex, newIndex+8));
				//console.log("old:" + lastIndex)
				lastIndex=newIndex+lastIndex+7;
			}
		}
		console.log(indices)
		

		for (let i = 0; i < indices.length; i++) {
			var matchIndex = indices[i];
			var modulecode = text.substring(matchIndex, matchIndex+7);
			console.log(`"${modulecode}"`)
			moduleTitle = modules[modulecode.trim()]
			console.log(moduleTitle)

			if (moduleTitle == null)
			{
				console.log(`deufg2`)
				continue;
			}
			console.log(`${modulecode} is a code: "${moduleTitle}"`)

			//var newelement = `<span title="${moduleTitle}">${modulecode}</span>`
			var newelement = `BEANS`;
			var newBody = ele.slice(0,matchIndex) + newelement + ele.slice(matchIndex+7);
			window.eval(`document.getElementsByTagName('body')[0].innerHTML = ${newBody};`)
		}

	}
}

function doTest() {
	console.log("doing tezt")
	const getModId = new RegExp("[A-Z]{2}([A-Z]|[0-9])[0-9]{4}|[a-z]{2}([a-z]|[0-9])[0-9]{4}\D");
	var body = document.getElementsByTagName('body')[0];
	let text = body.innerHTML;

	var foundBottom = false;

	if (text.search(getModId) != -1){
		console.log("amogus")
		var indices = []
		var newIndex = 0;
		var lastIndex = 0;
		while (newIndex != -1) {
			console.log("BEANS")
			newIndex = text.substring(lastIndex).search(getModId);
			if (newIndex != -1) {
				indices.push(newIndex+lastIndex);
				//console.log("new: " + newIndex)
				console.log("Suspected Code: " + text.substring(lastIndex).substring(newIndex, newIndex+8));
				var divhalf = text.substring(0,newIndex+lastIndex)


				var leftsideofDiv
				var foundOpener = false
				while (foundOpener == false) {
					console.log("LEMONS")
					var nearestOpener = divhalf.lastIndexOf(/<[a-z]+.*>/);
					var nearestCloser = divhalf.lastIndexOf(/<\/[a-z]+.*>/);
					console.log(`open: close:`)

					if (nearestOpener > nearestCloser) {
						foundOpener = true;
						leftSideOfEle = text.substring(nearestOpener)

					} else {
						divhalf = divhalf.substring(0,nearestOpener)
					}

					
				}
				//Get the opening < // <p><b>beans</b>pog<b>beans</b></p>
				

				var endHalf = text.substring(newIndex+lastIndex)

				var rightsideofDiv;
				var foundCloser = false;
				while (foundCloser == false) {
					console.log("ORANGES")
					var nearestOpener = endHalf.lastIndexOf(/<[a-z]+.*>/);
					var nearestCloser = endHalf.lastIndexOf(/<\/[a-z]+.*>/);

					if (nearestCloser > nearestOpener) {
						foundCloser = true;
						rightSideOfEle = text.substring(0,nearestcloser)

					} else {
						endHalf = endHalf.substring(nearestCloser)
					}

					
				}
				var finalString = leftsideofDiv + rightsideofDiv;

				console.log(finalString)
				lastIndex=newIndex+lastIndex+7;
			}
		}
		console.log(indices)



		console.log(elements);
		elements.forEach(element => {
			console.log(element)
			console.log(element.innerText)
		});
	}
}


function eatPageReceiver(request, sender, sendResponse) {
  replaceStuff();

}
setTimeout(() => {
	doTest();
},100)*/
