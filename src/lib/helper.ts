export async function req(url: string, options = {}) {
	return await (await fetch(url, options)).json();
}

// Might not need this
export function injectComponent(id, html) {
	let popup = document.createElement('div');
	popup.id = id;
	popup.innerHTML = html;
	document.body.appendChild(popup);
}
