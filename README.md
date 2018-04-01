# MBTA Web-Version

The website has been deployed on AWS: http://34.217.102.65

Frontend: react / Backend: nodejs + express / Database: mysql

## Getting Started


### Prerequisites

Need to have nodejs and mysql in local machine

### Installing

1. Install the dependencies in both frontend and backend

Redirect to frontend directory and backend directory and run :

```
npm install
```

2. Create database

2.1 Start mysql and manually create database called DB_MBTA

2.2 Create tables by redirect to backend/db and run:

```
node DBCreation.js
```
```
node LineDBCreation.js
```
```
node RouteDBCreation.js
```
```
node RouteToLineDBCreation.js
```

## Deployment

1. Start Backend
Redirect to backend directory and run:
```
node index.js
```

2. Start Frontend
Redirect to frontend directory and run:

```
npm start
```

3. Open the website on: www.localhost:3000
