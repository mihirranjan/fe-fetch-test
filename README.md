## Project FE-FETCH-TEST

This project consist of two folder and one file.

* server - This is the simple python server you have provided.
* ui - This the web application which is integrated to API
* update-json.js - Contribution api is missing with status field. This is a simple script been added to update status field to contribution.json with a simple logic.

> NOTE - A small change is been added to the main.py file for CORS error.

## Prerequisite for running the application
This application is build on node 18. Please use nvm command to switch the node version if you are using mac and nvm to avoid any warnings.

* Node 18
* NPM 10.8.2
* React 18
* Typescript 4
* Eslint 8
* Jest 27

## How to run the application
* Running the SERVER: Change directory to server and install node modules 
```
cd server && fastapi dev main.py
```

* Runninng the web App: Change directory to ui and install node modules[If you are on `server` directory, then please go back one directory back using `cd ..`]
```
cd ui && npm i
```

* Start the application
```
npm start
```

## What are the things covered from feature prospective.
1. Contribution shows all the fields mentioned(Title, Description, Start time, End time, Owner, Status)
2. It shows 14 contributions at once (contribution per page)
3. Handled breakpoint for desktop, tablet and mobile
4. Added a search bar at the top, that filters contributions by title
5. Addded pagination
6. Persist searches and pagination within the URL

## What are the things added from technical side.
* Added unit test. Please use below command to run the unit test
```
npm run test
```

* Added Linting. Please use below command to run the unit test
```
npm run lint
```
## Screenshots
