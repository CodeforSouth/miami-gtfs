# Miami GTFS Data

<img src='https://i.imgur.com/fkMtPMD.jpg' height='400px' />

#### Requirements

* Node 7.7+
* Docker and Docker Compose

#### Server

`cd server && docker-compose up`

After starting the server the first time, `GET localhost:3600/import`

#### Server Todo

Rail:
OBA: 19932
XML:

Gables:
OBA: 17789
SHAPE: 144537
XML: 9011

#### Setup Web

`cd web && yarn`

#### Run Web

`cd web && yarn start`

#### Todo

* [ ] make a package.json to handle bootstrapping
* [ ] write remaining code
