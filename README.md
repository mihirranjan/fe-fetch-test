## Project FE-FETCH-TEST

This project consists of two folders and one file.

* server - This is the simple Python server you have provided.
* UI - This is the web application that is integrated with the API.
* update-json.js - The api is missing with status field. This is a simple script been added to update status field to contribution.json with a simple logic.
  
> NOTE - A small change is been added to the main.py file for CORS error.

## Prerequisite for running the application

This application is built on node 18. Please use the nvm command to switch the node version if you are using Mac and nvm to avoid any warnings.

* Node 18
* NPM 10.8.2
* React 18
* TypeScript 4
* ESLint 8
* Jest 27

## How to run the application

* Running the SERVER: Change directory to server and install node modules. 

```
cd server && fastapi dev main.py
```

* Running the web App: Change directory to ui and install node modules[If you are on server directory, then please go back one directory back using cd ..]

```
cd ui && npm i
```

* Start the application

```
npm start
```

## What are the things covered from a feature perspective?

1. Contribution shows all the fields mentioned (Title, Description, Start time, End time, Owner, Status).
2. It shows 14 contributions at once (contribution per page).
3. Handled breakpoints for desktop, tablet, and mobile
4. Added a search bar at the top that filters contributions by title.
5. Added pagination
6. Persist searches and pagination within the URL

## What are the things added from the technical side?

* Added unit test. Please use the below command to run the unit test.

```
npm run test
```

* Added linting. Please use the below command to run the unit test.

```
npm run lint
```

## What does it look like?

![web-contribution-app](https://github.com/user-attachments/assets/b2370474-4f70-47bb-b140-9c21289d3877)

