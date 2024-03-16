import { YoutubeTranscript } from 'youtube-transcript';
import { summarize } from '$lib/ai';
import { injectComponent } from '$lib/helper';

function extractVideoId(url) {
	var videoId = url.match(
		/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
	);
	return videoId ? videoId[1] : null;
}

const summarizer = {
	name: 'summarizer',
	description: 'Summarizer',
	currentURL: '',
	summary: '',
	fetchTranscript: async (url: string) => {
		// Separate function in case need more features
		let res = await YoutubeTranscript.fetchTranscript(url, { lang: 'en' });
		let transcript = '';
		res.forEach((e) => {
			transcript += e.text + ' ';
		});
		return transcript;
	},
	feature: async (url = location.href) => {
		if (summarizer.currentURL == url) return;
		if (location.href.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\?v=/)) {
			let transcript = await summarizer.fetchTranscript(url);
			summarizer.summary = await summarize(`
Summarize the following video, do not add any headings, just output the summary in one SINGLE paragraph.

The video:

${transcript}`);
			injectComponent(summarizer.popupID, summarizer.popupHTML());
		} else {
			summarizer.summary = await summarize(`
Summarize the following webpage, do not add any headings, just output the summary in one SINGLE paragraph.

The video:

${document.body.innerText}`);
			injectComponent(summarizer.popupID, summarizer.popupHTML());
		}
	},
	enable: () => {
		summarizer.feature();
		window.navigation.addEventListener('navigate', (e) => {
			summarizer.feature(e.destination.url);
		});
	},
	popupID: 'cynosure-summarizerPopup',
	popupHTML: () => {
		let asd = document.createElement('button');
		close.onclick = () => {
			document.getElementById('cynosure-summarizerPopup').remove();
		};
		asd.onclick = () => {
			if (document.querySelector('#cynosure-summ')) {
				document.querySelector('#cynosure-summ').remove();
			} else {
				let ne = document.createElement('div');
				let p = document.createElement('p');
				p.innerText = summarizer.summary;
				ne.appendChild(p);
				ne.id = 'cynosure-summ';
				document.body.appendChild(ne);
			}
		};
		asd.innerHTML = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 17.9983C4.82497 17.9862 3.64706 17.8897 2.87868 17.1213C2 16.2426 2 14.8284 2 12L2 8C2 5.17157 2 3.75736 2.87868 2.87868C3.75736 2 5.17157 2 8 2L16 2C18.8284 2 20.2426 2 21.1213 2.87868C21.6112 3.36857 21.828 4.02491 21.9239 5M16.5 17.9983L17.3197 17.9957C19.2921 17.9748 20.3915 17.8512 21.1213 17.1213C22 16.2426 22 14.8284 22 12V9" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 6L15 6" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 9.5H9M17 9.5H12.5" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"/>
<path d="M10.8907 13.9454C11.53 13.4007 12.4702 13.4007 13.1094 13.9454C13.3833 14.1789 13.7239 14.32 14.0827 14.3486C14.9199 14.4154 15.5847 15.0802 15.6515 15.9174C15.6802 16.2762 15.8212 16.6168 16.0547 16.8907C16.5994 17.53 16.5994 18.4702 16.0547 19.1094C15.8212 19.3833 15.6802 19.7239 15.6515 20.0827C15.5847 20.9199 14.9199 21.5847 14.0827 21.6515C13.7239 21.6802 13.3833 21.8212 13.1094 22.0547C12.4702 22.5994 11.53 22.5994 10.8907 22.0547C10.6168 21.8212 10.2762 21.6802 9.91743 21.6515C9.08021 21.5847 8.41539 20.9199 8.34858 20.0827C8.31995 19.7239 8.17888 19.3833 7.94543 19.1094C7.40068 18.4702 7.40068 17.53 7.94543 16.8907C8.17888 16.6168 8.31995 16.2762 8.34858 15.9174C8.4154 15.0802 9.08021 14.4154 9.91743 14.3486C10.2762 14.32 10.6168 14.1789 10.8907 13.9454Z" stroke="#1C274D" stroke-width="1.5"/>
<path d="M10.5 18.2L11.3571 19L13.5 17" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
		return asd;
	}
};

export default summarizer;
