export function routeType(type) {
  switch (type) {
    case 0:
      return {
        text: 'TRAM',
        style: {
          backgroundColor: '#547980',
        },
      };
    case 2:
      return {
        text: 'RAIL',
        style: {
          backgroundColor: '#F21D41',
        },
      };
    case 3:
      return {
        text: 'BUS',
        style: {
          backgroundColor: '#157AFC',
        },
      };
    case 4:
      return {
        text: 'TROLLEY',
        style: {
          backgroundColor: '#FF8D3B',
        },
      };
    default:
      return {
        text: 'UNKNOWN',
        style: {
          backgroundColor: '#ccc',
        },
      };
  }
}
