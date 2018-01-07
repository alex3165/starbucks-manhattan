
export const csvToJSON = (csv) => csv.split('\n').map(row => row.split(','));

export const normalize = ([legend, ...rest]) => {
  const starbucks = rest.reduce((acc, next) => {
    acc[next[1]] = legend.reduce((place, key, index) => {
      const camelCaseKey = key.replace(' ', '');
      place[camelCaseKey] = next[index];
      return place
    }, {});

    return acc;
  }, {});

  return starbucks;
}

export const toGeoJSON = (data) => {
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: Object.values(data).map(location => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location.Longitude, location.Latitude],
          properties: location
        }
      }))
    }
  }
}