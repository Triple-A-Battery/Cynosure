import { injectComponent } from '$lib/helper';

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
		if (ifs.scrollAmount > 15000) {
			injectComponent(ifs.popupID, ifs.popupHTML());
			ifs.scrollAmount = 0;
		}
	},
	enable: () => {
		window.addEventListener('scroll', (e) => {
			ifs.feature(e);
		});
	},
	popupID: 'cynosure-ifsPopup',
	popupHTML: () => {
		return `
<p>You seem to love to scroll, but are you sure its want you to be doing?</p>
<p>You might want to get focused by searching more specifically!</p>
		`;
	}
};

export default ifs;
