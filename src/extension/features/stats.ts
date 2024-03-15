// import { injectComponent } from "$lib/helper";

// const stats = {
// 	name: "stats",
// 	description: "Monitor statistics for later analysis",
// 	feature: (e) => {
// 	},
// 	enable: () => {
// 		window.addEventListener('navigate', (e) => {
//
// 		});
// 	},
// 	popupID: "cynosure-ifsPopup",
// 	popupHTML: () => {
// 		return `
// <p>Get stats for your browsing habits</p>
// 		`;
// 	}
// };
//
// export default stats;

export async function saveStat(relevance: Number) {
	let stats = (await chrome.storage.local.get(['stats']))['stats'];
	if (!stats) stats = [];

	stats.push([new Date().toISOString(), "taskFocus", relevance]);
	await chrome.storage.local.set({ stats });

	// Save to supabase:
	// const { data, error } = await supabase.from('stats').insert([
}
