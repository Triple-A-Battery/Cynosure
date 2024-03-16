import { get, set } from '$lib/storage';
import { cosineSimilarity, getEmbedding } from '$lib/embedding';
import { injectComponent } from '$lib/helper';
import { saveStat } from './stats';

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
	popupID: 'cynosure-warn',
	popupHTML: (relevance: Number) => {
		return `
<!--<p>This task matches only ${relevance}% with your main task</p>-->
<p>You seem to be deviating from your task.</p>
<p>You might want to get back!</p>
		`;
	}
};

export default taskFocus;
