# Miami GTFS Data

## Overview

Miami-Dade County transportation is known to give very bad user experiences. Depending on if your a resident knowing where transit happens or when it's going to come could be difficult. In Miami-Dade County and with the City of Miami they have open data feed called General Transit Feed Specication (GTFS) which is a set of open data feeds given by Miami-Dade County. 

### Visualize data on a map of GTFS Transit

Miami GTFS lets developers create a tool that creates a map that can be used to allow residents to see transit information related to routes for trolleys, metrorails and the people mover. 

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

#### References

* [Transit Feeds](https://transitfeeds.com/p/miami-dade-county-transit/48)
* [Miami-Dade County Website](https://www8.miamidade.gov/global/transportation/open-data-feeds.page)
* [Miami-Dade Open Data Portal](https://gis-mdc.opendata.arcgis.com/datasets/ba2e2044d5894e44a8c5fa69b04377d5)


## City of Miami
* [Requirements](https://docs.google.com/document/d/1_j5QvwBZ7yHSMatBBxph3NNzCj_H5Ew9Xu-gjt4eJSM/edit?usp=sharing)
