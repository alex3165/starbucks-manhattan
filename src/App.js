import React, { Component } from 'react';
import MapboxGl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import { csvToJSON, normalize, toGeoJSON } from './utils';
import { URL, TOKEN, STYLE, STARBUCK_SOURCE_ID } from './constants';

const getCSV = () => fetch(URL).then((res) => res.text()).then(csvToJSON).then(normalize)

const containerStyle = {
  width: '100vw',
  height: '100vh'
}

class App extends Component {
  state = {
    data: undefined
  }

  componentWillMount() {
    getCSV().then((res) => {
      this.setState({
        data: res
      });

      if (this.state.map) {
        this.setLayers(this.state.map, res);
      }
    })
  }

  componentDidMount() {
    MapboxGl.accessToken = TOKEN;

    const map = new MapboxGl.Map({
      container: this.container,
      style: STYLE
    });

    map.on('load', () => {
      this.setState({
        map
      });
  
      if (this.state.data) {
        this.setLayers(map, this.state.data);
      }
    });

  }

  setLayers = (map, data) => {
    const geoJSONData = toGeoJSON(data);
    map.addSource(STARBUCK_SOURCE_ID, geoJSONData);
    map.addLayer({
      id: 'starbucks',
      source: STARBUCK_SOURCE_ID,
      type: 'symbol',
      layout: {
        'icon-image': 'starbuck'
      }
    });
  }

  render() {
    return (
      <div ref={(x => this.container = x)} style={containerStyle}/>
    );
  }
}

export default App;
