import { get, set } from '$lib/storage';
import { cosineSimilarity, getEmbedding } from '$lib/embedding';
import { injectComponent } from '$lib/helper';
import { saveStat } from './stats';

let popup;
let taskFocus = {
	name: 'taskFocus',
	description: 'Distraction check',
	relevance: 1,
	feature: async () => {
		document.querySelector(`#${taskFocus.popupID}`)?.remove();

		let currentTaskEmbed = await get('taskEmbedding');

		if (!currentTaskEmbed) return;

		let currentPageEmbed = (await getEmbedding([document.title]))[0];

		taskFocus.relevance = cosineSimilarity(currentPageEmbed, currentTaskEmbed);

		let stats = await get('stats');

		saveStat(taskFocus.relevance);
		if (taskFocus.relevance < 0.55) {
			injectComponent(
				taskFocus.popupID,
				taskFocus.popupHTML(Math.round(taskFocus.relevance * 100))
			);
		} else {
			document.querySelector('#cynosure-warn-offtopic')?.remove();
		}

		console.log(taskFocus.relevance);
	},
	enable: () => {
		// Will fail if navigation does not exist
		taskFocus.feature();
		window.navigation.addEventListener('navigate', () => {
			taskFocus.feature();
		});
	},
	popupID: 'cynosure-warn-offtopic',
	popupHTML: () => {
		popup = document.createElement('p');
		popup.innerText = 'This does not match your main task';
		popup.onclick = () => {
			document.getElementById('cynosure-warn-offtopic').remove();
		};
		return popup;
	}
};

export default taskFocus;
