/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import Grid from 'amazeui-react/lib/Grid'
import Col from 'amazeui-react/lib/Col'
import Input from 'amazeui-react/lib/Input'
import Icon from 'amazeui-react/lib/Icon'
import Kefir from 'kefir'

import StatusIndicator from '../common/StatusIndicator'

export default class VenueStatus extends React.Component {

  constructor(props) {
    super(props);
    this.healthPathStream = Kefir.stream(emitter=> {
      this.healthPathEmitter = emitter;
    })
  }

  venueChangeCallback = (evt) => {
    const venue = this.venue.value;
    console.log('<VenueStatus.venueChangeCallback>', venue);
    this.healthPathEmitter.emit(venue);
  }

  get venue() {
    return document.querySelector('#venue');
  }

  componentDidMount() {
    console.log('<VenueStatus.componentDidMount>');
    this.venueSub = Kefir.fromEvents(this.venue, 'input')
      .debounce(500)
      .onValue(this.venueChangeCallback);
  }

  componentWillUnmount() {
    console.log('<VenueStatus.componentWillUnmount>');
    this.healthPathEmitter.end();
    this.venueSub.offValue(this.venueChangeCallback);
  }

  render() {
    return (
      <Grid collapse>
        <Col sm={9}>
          <input type="text" id="venue" placeholder="venue"
                 className="am-form-field"/>
        </Col>
        <Col sm={2}>
          <StatusIndicator healthPath={this.healthPathStream}
                           pathPrefix="venues/" pathSuffix="/heartbeat"/>
        </Col>
      </Grid>
    );
  }
}
