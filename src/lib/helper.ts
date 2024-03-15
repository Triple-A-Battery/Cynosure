export async function req(url: string, options = {}) {
	return await (await fetch(url, options)).json();
}

// Might not need this
export function injectComponent(id, html: string | HTMLElement) {

	let popup = document.createElement('div');
	popup.id = id;

	if (typeof (html) == 'string') {
		popup.innerHTML = html;
	} else {
		popup.appendChild(html);
	}

	document.body.appendChild(popup);
}
