import supabase from '$lib/supabase';

export async function saveStat(relevance: Number) {
	let stats = (await chrome.storage.local.get(['stats']))['stats'];
	if (!stats) stats = [];

	stats.push([new Date().toISOString(), "taskFocus", relevance]);
	await chrome.storage.local.set({ stats });

	let id = (await chrome.storage.local.get(['spectra'])).spectra;

	if (id) {
		// Save to supabase:
		const { data, error } = await supabase.from('Stats').insert({ relevance, user_id: id });
	}
}
