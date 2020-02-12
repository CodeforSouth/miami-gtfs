# Miami GTFS Data
The General Transit Feed Specification (GTFS) is an open format that Google created to allow transit agencies to easily provide schedule data to Google Transit. However, Google encourages its use for other applications, and it’s available under a Creative Commons Attribution-ShareAlike (free) license. Miami-Dade County released a feed, but City of Miami doesn't have it's own feed. This is a project explore publishing a City of Miami local feed and building service-based application for residents.

* [Requirements](https://docs.google.com/document/d/1_j5QvwBZ7yHSMatBBxph3NNzCj_H5Ew9Xu-gjt4eJSM/edit?usp=sharing)
* [GTFS Best Practices](https://gtfs.org/best-practices/)
* [Transit Feeds - Open Transit](https://transitfeeds.com/p/miami-dade-county-transit/48)
* [Miami-Dade County - Open Data Feed](https://www8.miamidade.gov/global/transportation/open-data-feeds.page)
* [Miami-Dade Open -  Data Portal](https://gis-mdc.opendata.arcgis.com/datasets/ba2e2044d5894e44a8c5fa69b04377d5)
## Documentation

Documentation is contained in Markdown files within the repository

| File          | Purpose |
| ------------- | -----------|
| [README.md](README.md) | This root document |
| [LICENSE.md](LICENSE.md) | Our software license |
| [Documentation](https://github.com/cscape/miamitransit-docs) | See documentation on Miami Transit provided by member @ciolt |


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





