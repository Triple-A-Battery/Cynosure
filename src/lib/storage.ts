export function set(key: string, value: any) {
	let obj: { [key: string]: any } = {};
	obj[key] = value;
	chrome.storage.session.set(obj);
};

export async function get(key: string) {
	return (await chrome.storage.session.get([key]))[key];
};
