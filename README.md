<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/14acby7Yk6vQpkGIYQAmgdP1NJ0OqgJFc

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## How It Works
1. User enters academic and project preferences
2. The app injects inputs into a structured master prompt
3. Google Gemini generates a complete ECE project with report
4. Output can be used for college submission or hackathons
