# Cynosure

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
   - [Spectra (Enterprise Version)](#spectra-enterprise-version)
   - [Align (Student Version)](#align-multi-device-version)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Deployment](#deployment)
6. [License](#license)

## About

The internet can be a vast and distracting place, pulling users away from their tasks with endless content and notifications. Cynosure is a Google Chrome extension designed to combat digital distractions by leveraging psychological theories to foster self-regulated internet usage. Its goal is to help users stay focused on their tasks and minimize distractions, reminding them to return to their work when they get off track.

Rooted in the insights of Lilian Anthonysamy's paper "Self-regulation Strategic Framework for Minimizing Distraction in Digital Society," Cynosure offers a comprehensive solution to the challenge of managing online distractions.

## Features

1. **Spectra (Enterprise Version)**:
   - Managerial Support: Acts as a virtual assistant, handling administrative tasks such as scheduling meetings and facilitating team communication.
   - Task Management: Facilitates efficient task allocation within teams, optimizing workflow and fostering collaboration.
   - Task Monitoring: Alerts managers to incomplete tasks, enabling timely intervention and accountability enforcement.
   - Instant Update: Get tasks pushed straight to your member's startpages.

2. **Align (Student Version)**:

   - Smart Memory: Assists users in retaining essential information by intelligently recalling relevant details as needed.
   - Auto Reader: Streamlines information consumption by providing text-to-speech and summarization features, enhancing efficiency.
   - Infinite Scroll Notification: Alerts users to excessive scrolling, promoting mindful internet browsing habits.
   - Off-Topic Notification: Keeps users focused by notifying them when they stray from their intended tasks or topics.
   - Zen Mode: Provides a serene, distraction-free environment conducive to deep work and concentration.
   - Todo Startpage: Offers a centralized hub for managing tasks and priorities, enhancing productivity and organization.

## Technologies

1. SvelteKit (Custom-made adapter to compile Chrome extension)
2. Tailwind CSS
3. Supabase
4. Chrome API
5. Gemini

## Installation

```sh
git clone https://github.com/Triple-A-Battery/Cynosure.git
cp env.example.ts env.ts   # Edit variables accordingly
cd Cynosure
pnpm i
pnpm build
pnpm vite-dev
```

Install the extensions:

1. Open your Chromium-based browser and navigate to `chrome://extensions`.
2. Enable `Developer mode` and click on `Load unpacked`.
3. Select the folder `build/extension` to load the extension.

## Deployment

The `build/server` contains the backend embeddings API. This can be deployed by easily using our Docker image.

The default port is `8009`, and can be changed in `env.ts` before building. The reason for an unorthodox methodology of environment variables is because of the static nature of Chrome extensions.

## License

[MIT License](LICENSE)
