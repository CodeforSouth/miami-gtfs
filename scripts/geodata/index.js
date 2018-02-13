const _ = require('lodash')

const trolleys = require('./trolleys.json');

const dade = require('./dade')
const gables = require('./gables')

async function main() {
  const { mover, train } = dade()
  const gables = gables()

  let routes = trolleys.map(route => {
    route.type = 'miami-trolley'
    route.stops = route.stops.map(stop => {
      type: 'miami-trolley'
    })
    return route
  })

  let train = {
    type: 'rail',
    id: 'rail',
    name: 'Rail',
    poly: mover.shapes,
    color: {
      ORG: '',
      GRN: ''
    },
    stops: 
  }

  _(mover.shapes).map((shape, id) => {
    return {
      
    }
  }).value()

  _(train.shapes).map((shape, id) => {
    return {
      type: 'mover',
      id: 'rail',
      name: 
    }
  }).value()
}

main();
