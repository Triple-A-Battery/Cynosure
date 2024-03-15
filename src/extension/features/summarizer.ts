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
			summarizer.summary = await summarize(transcript);
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
		asd.onclick = () => {
			document.getElementById(summarizer.popupID).innerHTML = summarizer.summary;
		};
		asd.innerText = 'Summary is ready';
		return asd;
	}
};

export default summarizer;
