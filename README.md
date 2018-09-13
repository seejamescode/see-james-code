# https://seejamescode.com

The James Y Rauhut portfolio app collects data from GitHub, Medium, YouTube, and Vimeo to create a live gallery of blogs, talks, and projects.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup

1. `npm install && npm run build:images`
2. Create a `now.json` file with your environment variables from different APIs:
   ```
   {
     "env": {
       "github": "",
       "twitter_consumer_key": "",
       "twitter_consumer_secret": "",
       "twitter_access_token_key": "",
       "twitter_access_token_secret": "",
       "username": "", // Medium username
       "vimeo": "",
       "youtube": ""
     },
     "files": [
       "build",
       "now.json"
     ]
   }
   ```
3. `npm run dev`
