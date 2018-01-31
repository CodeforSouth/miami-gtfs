#!/bin/bash

yarn build
rsync -azP build/ ubuntu@ideakeg.xyz:/home/ubuntu/dtif --exclude .DS_Store
