import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../Common/Navbar'
import JoinButton from './Join'

class Detail extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: '',
        imageGame: '',
        title: '',
        createAt: '',
        numberOfUsers: '',
        members: [],
      }
    }
  }
  _fetchData() {
    axios.get('https://pwa2017-whats-going-on.firebaseio.com/Pin/'+ this.props.match.params.id +'.json')
      .then((response) => {
        this.setState({ 
          data: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  componentDidMount() {
    this._fetchData()
  }
  render() {
    return (
      <div>
        <Navbar />
        <article className="media">
          <figure className="media-left">
            <p className="image is-96x96">
              <img src={ this.state.data.imageGame } />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{ this.state.data.name }</strong> <small>{ this.state.data.createAt }</small>
                <br />
                <h3>{ this.state.data.title }</h3>
                { this.state.data.descriptions }
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-tags"></i></span>
                </a>
                { this.state.data.categories && this.state.data.categories.join(' ') }
                &nbsp;&nbsp;
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-users"></i></span>
                </a>
                &nbsp; { this.state.data.members.length } / { this.state.data.numberOfUsers }
                &nbsp;&nbsp;
                <JoinButton detailReload={this._fetchData.bind(this)} id={ this.props.match.params.id } />
              </div>
            </nav>
          </div>
        </article>
      </div>
    )
  }
}

export default Detail