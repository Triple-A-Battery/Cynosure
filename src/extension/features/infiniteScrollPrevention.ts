import { injectComponent } from '$lib/helper';

let popup;
const ifs = {
	name: 'infiniteScrollPrevention',
	description: 'Infinite scroll prevention',
	scrollAmount: 0,
	previousScroll: undefined,
	feature: (e) => {
		if (ifs.previousScroll && ifs.previousScroll < e.target.scrollingElement.scrollTop) {
			ifs.scrollAmount += e.target.scrollingElement.scrollTop - ifs.previousScroll;
		} else {
			ifs.scrollAmount = 0;
		}

		ifs.previousScroll = e.target.scrollingElement.scrollTop;
		if (ifs.scrollAmount > 5000) {
			injectComponent(ifs.popupID, ifs.popupHTML());
			ifs.scrollAmount = 0;
		}
	},
	enable: () => {
		window.addEventListener('scroll', (e) => {
			ifs.feature(e);
		});
	},
	popupID: 'cynosure-warn-infinite',
	popupHTML: () => {
		popup = document.createElement('p');
		popup.innerText = 'Stop scrolling. Get back to work.';
		popup.onclick = () => {
			document.getElementById('cynosure-warn-infinite').remove();
		};
		return popup;
	}
};

export default ifs;
