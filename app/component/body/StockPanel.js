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
import Container from 'amazeui-react/lib/Container'

import StatusIndicator from '../common/StatusIndicator'
import StockArea from './StockArea'
import {eventEmitter, venueStream} from '../util/api'

export default class StockPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  venueChangeCallback = (evt) => {
    const venue = this.venue.value;
    console.log('<StockPanel.venueChangeCallback>', venue);
    eventEmitter.emit('venue', venue);
  }

  get venue() {
    return document.querySelector('#venue');
  }

  componentDidMount() {
    console.log('<StockPanel.componentDidMount>');
    this.venueSub = Kefir.fromEvents(this.venue, 'input')
      .debounce(500)
      .onValue(this.venueChangeCallback);
  }

  componentWillUnmount() {
    console.log('<StockPanel.componentWillUnmount>');
    this.venueSub.offValue(this.venueChangeCallback);
  }

  render() {
    return (
      <div>
        <Grid>
          <Col sm={2}>
            <input type="text" id="venue" placeholder="venue"
                   className="am-form-field"/>
          </Col>
          <Col sm={1} end>
            <StatusIndicator healthPath={venueStream}
                             pathPrefix="venues/" pathSuffix="/heartbeat"/>
          </Col>
        </Grid>
        <Container><StockArea venueStream={venueStream}/></Container>
      </div>
    );
  }
}
