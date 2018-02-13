# Miami GTFS Data

<img src='https://i.imgur.com/fkMtPMD.jpg' height='400px' />

#### Requirements

* Node 7.7+
* Docker and Docker Compose

#### Server

`cd server && docker-compose up`

After starting the server the first time, `GET localhost:3600/import`

#### Setup Web

`cd web && yarn`

#### Run Web

`cd web && yarn start`

#### Todo

* [ ] make a package.json to handle bootstrapping
* [ ] write remaining code

#### Miami Beach tracker:

[link](https://publictransportation.tsomobile.com/webtracker/webtracker.htm?labels=false&tkn=825894C5-2B5F-402D-A055-88F2297AF99A&lan=en)

`window.cwebtracker`
