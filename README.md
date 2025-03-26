# Nerve
2nd Place Winner of BizTech ProductX Hackathon + Creative Destruction Lab and Venture Founder Prize

A real-time monitoring dashboard for emergency dispatch units, powered with sentiment analysis and critical event detection.

## Inspiration
This project was inspired by stories of ineffective, scattered, and delayed communication between dispatch field units and HQ monitoring them. These have unfortunately lead to lost lives, lost time, and lost resources. Current legacy systems were built decades ago, and are not designed to maximize modern user experience and real-time info retrieval.

We were inspired by how real-time information supplies real-time decisions. We want a system that saves time, saves lives, and saves resources at a crucial moment when they all matter

## What it does
Nerve is a dashboard that live streams in body cam audio and video, and displays live updates on the deployed field units. We also perform sentiment analysis on a live transcript, and summarize the current events to provide a useful, supplemental view of the current situation. The UI is also designed to be clean and convey information in an appealing way.

## How we built it
We used NextJS, ReactJS, TailwindCSS and Mapbox to implement the dashboard frontend and the client to record the videos. We used socket.io to record and injest videos, TensorFlow and AssemblyAI to perform sentiment analysis, Supabase for database persistence, ngrok to connected the sockets together, expressJS to route the backend and OpenAI to summarize the events. We designed the dashboard with Figma, implemented the solution architecture with Draw.io and built our presentation with Google Slides.

## Challenges we ran into
Getting the sockets to connect together, merge conflicts, fighting scope creep, connecting the backend and frontend together, and managing the real-time data stream.

## Accomplishments that we're proud of
Learning new technologies, and building a project together as a team of Kevins.

## What we learned
New technologies, programming with live-streaming audio and video, and pitching a project for dispatch. We also learned to understand the long-term vision of the company and next steps if we wanted to continue growing it!

## What's next for Nerve
Understanding regulations and how we can build our app to be compliant with data privacy, handling PII, etc.
Exploring auto-integration with other dispatch services
Explore infrastructure improvements to allow reliability, even during disasters
The slide deck we presented with is linked here! https://drive.google.com/file/d/17qXEj_BnCy4C2s4Q5Md7mCA1LwJN1FcP/view?usp=sharing


