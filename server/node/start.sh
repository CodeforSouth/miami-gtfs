#!/bin/bash

cd /home/app
yarn install

cd ./node_modules/gtfsdb
yarn install
cd /home/app

dockerize -wait http://postgres:5432

echo "migrate"
knex migrate:latest
echo "update"
node update.js
echo "node"
nodemon -L /home/app --exec babel-node --presets es2015,stage-0
