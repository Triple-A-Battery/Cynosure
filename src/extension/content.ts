console.log("Cynosure Test");

import { features } from '$extension/features';

const DEFAULT_CONFIG = (() => {
	let conf = {};
	for (const feature of features) conf[feature.name] = true;
	return conf;
})()
// const DEFAULT_CONFIG = {
// 	taskFocus: true,
// }

// Config:
chrome.storage.local.get(["config"]).then(({ config }) => {
	if (!config) return chrome.storage.local.set({ config: DEFAULT_CONFIG })

	for (const feature of features) {
		if (config[feature.name]) {
			feature.enable();
		}
	}
})
