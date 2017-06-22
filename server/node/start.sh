#!/bin/bash

cd /home/app
yarn install

dockerize -wait http://mongo:27017

nodemon -L /home/app --exec babel-node --presets es2015,stage-0
