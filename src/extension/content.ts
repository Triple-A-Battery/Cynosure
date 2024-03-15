console.log("Cynosure Test");

chrome.storage.local.set({ key: "somethingman" });

chrome.storage.local.get().then(res => {
	console.log(res);
})
