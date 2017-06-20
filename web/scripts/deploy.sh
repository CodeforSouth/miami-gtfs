#!/bin/bash

rsync -azP build/ ubuntu@ideakeg.xyz:/home/ubuntu/utf --exclude .DS_Store
