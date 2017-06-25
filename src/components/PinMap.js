import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Map, {GoogleApiWrapper} from './Map'
import Marker from '../../src/components/Marker'
import InfoWindow from '../../src/components/InfoWindow'
import { Link } from 'react-router-dom'

class PinMap extends Component {
  constructor () {    
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      pins: [],
    }
  } 

  _fetchData = () => {
    axios.get('https://pwa2017-whats-going-on.firebaseio.com/Pin.json')
      .then((response) => {
        this.setState({ 
          pins: response.data
        })
        console.log(this.state.pins);
        this.setState({ 
          pins: [{
            id: 0,
            title: 'หาคนรู้ใจมาเล่นเกม Uno spin',
            descriptions: 'มาเล่นเกมกันบ้านเรามีเกมเล่นเยอะเลย มีของกินอร่อย ๆ เพียบ แอร์พร้อม wi-fi ฟรี',
            cood_x: 100.4660867,
            cood_y: 13.7138229,
            categories: ['co-op', 'board', 'Adventure', 'party'],
            createAt: '25/06/2560 17:54:23',
            createBy: 'top.collection.it@gmail.com',
            imageGame: 'https://i.ytimg.com/vi/ckUQse-kWv4/maxresdefault.jpg',
            members: [{name: 'Khing', token: 'cxasdadsadsdad', image: 'http://static.goal.com/4323400/4323432_news.jpg'}],
            name: 'TOPz',
            numberOfUsers: 6,
          }]
        })


      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount = () => {
    this._fetchData()
  }
  
  onMapMoved = (props, map) => {
    const center = map.center;
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
  
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  render () {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    } 

    console.log(this.state.pins)
    
    return (
      <Map google={this.props.google}
          style={{width: '100%', height: '400px', position: 'relative'}}
          className={'map'}
          zoom={14}
          containerStyle={{}}
          centerAroundCurrentLocation={true}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved} >

          {
            this.state.pins && this.state.pins.map((pin) => {
              return (<Marker
              onClick={this.onMarkerClick}
              title={pin.title}
              descriptions={pin.descriptions}
              imageGame={pin.imageGame}
              id={pin.id}
              name={pin.name}
              createAt={pin.createAt}
              position={{lat: pin.cood_y, lng: pin.cood_x}} />)
            })
          }
          
          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <ul>
                <li className="line-heigh-info-window">
                  <div className="inline info-img"><img className="image is-96x96" src={this.state.selectedPlace.imageGame}/></div> 
                  <div className="inline">
                    <div className="title is-5">{this.state.selectedPlace.title}</div>
                    <div className="subtitle is-6">create by: {this.state.selectedPlace.name}</div>
                    <div><i className="fa fa-clock-o middle"></i>{this.state.selectedPlace.createAt}</div>
                  </div>
                </li>
                <li>
                  {this.state.selectedPlace.descriptions}
                </li>
                <li><hr/></li>
                <li>
                  <a className="button is-primary title is-5">Let's Rock</a>
                </li>
              </ul>
              
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAMKm8sG8J_fYSLGf3oxUNfNLNM2SvRr2c"
})(PinMap)