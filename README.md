# Top 10 Websites Project

## Overview

This project list top 10 websites for guitar learning.

On page load, it will list top 10 websites.
A search bar is provided to search for website, it will search for matches in the title and description.

Upon clicking an item, a dialog will show up with more details about the website (video/image) and some recommended similar websites in the bottom.

![demo](https://github.com/albertsundjaja/top_10_websites/blob/master/docs/demo.gif)

## Installation

For easier deployment, this project uses `docker` and `docker-compose`, please make sure you have the latest one installed before continuing.

Clone this repo

```
git clone https://github.com/albertsundjaja/top_10_websites.git
```

Go into the project folder

```
cd top_10_websites
```

Setup the containers

```
docker-compose build
```

Create docker volume to store DB data

```
docker volume create pgvolume-topten
```

Edit the `.env.production` file for the frontend (use any text editor)

the file is located at

```
src/vue-frontend/.env.production
```

You will need to edit the API host (node-api) address
if you are running on localhost edit the HOST address to

```
VUE_APP_APIHOST=http://localhost:3000
```

Edit the `.env` file for the node-api (use any text editor)

the file is located at

```
src/node-api/.env
```

You will need to edit the PostgreSQL host
if you are running on localhost edit the `POSTGRES_HOST` address to

```
POSTGRES_HOST=localhost
```

Spin up the containers

```
docker-compose up -d
```

If this is the first time the project is run, 
the database need to be constructed and populated with sample data

you can use `psql` to do so

```
psql -U postgres -h localhost -d topten -f ./src/node-api/db/migrations/20210413_init.sql
```

NOTE: if asked for password during psql execution, the default is `somepassword123`

## Test

the `node-api` has unit testings in place
to run the test go to the `node-api` folder

```
cd src/node-api
```

and run the command

```
npm run test
```

## Recommender system

The recommender system uses PostgreSQL's `ts_vector` (similar to TF-IDF) to find item with similar description.
Then it will rank the similar items using `Jaccard Index` and pick the top 3 items with highest Jaccard Index score.

## Further improvement

It is known that the search functionality is not optimal in searching for items.
This is due to the threshold in PostgreSQL in classifying whether an item is similar or not.
This threshold need to be tweaked so that relevant items can be found more easily.