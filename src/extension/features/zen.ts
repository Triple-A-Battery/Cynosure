import { Readability } from '@mozilla/readability';
import { injectComponent } from '$lib/helper';

const zen = {
	name: 'zen',
	description: 'Zen mode',
	feature: () => {
		let article = new Readability(document).parse();
		document.write(zen.getReaderHTML(article));
		injectComponent(zen.popupID, zen.popupHTMLNormal());
	},
	enable: () => {
		injectComponent(zen.popupID, zen.popupHTML());
	},
	popupID: 'cynosure-zen',
	popupHTML: () => {
		let elem = document.createElement('a');
		elem.innerHTML = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 805 805">
	<g id="YinYang" fill="#1a1a1a" stroke="none" stroke-width="0" fill-rule="evenodd">
		<path d="M400 0C179.086 0 0 179.086 0 400 0 620.914 179.086 800 400 800 620.914 800 800 620.914 800 400 800 179.086 620.914 0 400 0zM400 10C184.609 10 10 184.609 10 400 10 615.391 184.609 790 400 790 292.304 790 205 682.304 205 600 205 492.3 292.304 400 400 400 507.7 400 600 292.304 600 200 600 92.304 507.7 10 400 10zM400 665c35.895 0 65-29.105 65-65 0-35.895-29.105-65-65-65-35.895 0-65 29.105-65 65 0 35.895 29.105 65 65 65zM400 132c-37.555 0-68 30.445-68 68 0 37.555 30.445 68 68 68 37.555 0 68-30.445 68-68 0-37.555-30.445-68-68-68z"/>
	</g>
</svg>
`;
		elem.onclick = () => {
			zen.feature();
		};
		return elem;
	},
	popupHTMLNormal: () => {
		let elem = document.createElement('button');
		elem.innerText = 'Back';
		elem.onclick = () => {
			location.reload();
		};
		return elem;
	},
	getReaderHTML: ({ content, title }) => {
		return `
<html>
<head>
<style>
html {
  margin: 0;
  padding: 0;
}
body {
  color: #111111;
  background-color: #f6f6f6;
  font-family: sans-serif;
  font-size: 1.3em;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 auto;
  padding: 40px 10px 80px;
  text-orientation: upright;
  transition:
    color 200ms cubic-bezier(0.4, 0, 1, 1),
    background-color 200ms cubic-bezier(0.4, 0, 1, 1);
}
body.vertical {
  margin: 40px auto 0;
  padding: 40px 60px 0;
  max-height: calc(100vh - 120px);
}
.entry-content * {
  max-width: 100%;
  white-space: normal;
  line-height: inherit;
  vertical-align: baseline;
  background: transparent;
}
.entry-content p {
  margin: 1.5em 0;
}
body.vertical .entry-content p {
  margin: 0 1.5em;
}
h1 {
  font-size: 1.8em;
  line-height: 1.35;
}
h1, h2, h3, h4, h5, h6, b {
  font-weight: 700;
}
hr {
  border-style: solid;
  border-width: 0 0 0.5px 0.5px;
}
.byline,
.figcaption {
  font-style: italic;
}
.entry-content img {
  max-width: 100%;
  height: auto;
}
body.vertical .entry-content img {
  max-height: 100%;
  width: auto;
}
.entry-content code {
  font-weight: 500;
}
.entry-content pre {
  font-weight: 300;
  background-color: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.1);
  white-space: pre-wrap;
  padding: 0.5em;
  margin: 1.5em 0;
}
.entry-content code, .entry-content pre {
  text-align: left;
  max-width: 100%;
  writing-mode: horizontal-tb;
  overflow: auto;
  white-space: pre-wrap;
}
body.vertical .entry-content pre {
  margin: 0 1.5em;
  max-width: 80%;
  max-height: 100%;
}
blockquote {
  border-left: 2px solid currentColor;
  padding-left: 1em;
  margin-left: 0;
}
blockquote p {
  font-style: italic;
}
iframe, textarea, input {
  display: none;
}
</style>
</head>
<body style="background-color: rgb(246, 246, 246); color: rgb(34, 34, 34); font-family: sans-serif; font-size: 1.3em; line-height: 1.5; writing-mode: unset; max-width: 64ch; height: unset;">
	<h1>${title}</h1>
    ${content}
</body>
</html>
		`;
	}
};

export default zen;
