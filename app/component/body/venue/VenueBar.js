/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Kefir from 'kefir'

import ItemAddress from './address/ItemAddress'
import {eventEmitter, venueStream, apiStockFighter, selectedVenueStream, stockTickerStream} from '../../util/api'

export default class VenueBar extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    venueUp: false
  }

  componentDidMount() {
    console.log('<VenueBar.componentDidMount>');
    this.venueInputStream = Kefir.fromEvents(this.venue, 'input').debounce(500);
    this.venueInputStream.onValue(this.onVenue);
    this.tradingAccountStream = Kefir.fromEvents(this.tradingAccount, 'input').debounce(500);
    this.tradingAccountStream.onValue(this.onTradingAccount);
  }

  componentWillUnmount() {
    console.log('<VenueBar.componentWillUnmount>');
    this.venueInputStream.offValue(this.onVenue);
    this.tradingAccountStream.offValue(this.onTradingAccount);
  }

  venueStatus = (venueUp) => {
    this.setState({venueUp});
  }

  onTradingAccount = (evt) => {
    console.log('<VenueBar.onTradingAccount>', this.tradingAccount.value);
    eventEmitter.emit('tradingAccount', this.tradingAccount.value);
  }

  onVenue = (evt) => {
    this.venueStatus(false);
    const venue = this.venue.value;
    console.log('<VenueBar.onVenue>', venue);
    apiStockFighter({path: `venues/${venue}/heartbeat`})
      .then(resp=> {
        console.log('<VenueBar.venueHealth>', resp.entity);
        this.venueStatus(resp.entity.ok);
      }).catch(e=> {
      console.log('<VenueBar.venueHealth> failed', e);
    });
  }

  get venue() {
    return document.querySelector('#venueInput');
  }

  get tradingAccount() {
    return document.querySelector('#tradingAccountInput');
  }

  addVenue = (evt) => {
    evt.preventDefault();
    console.log('<VenueBar.addVenue>', this.venue.value);
    eventEmitter.emit('venue', this.venue.value);
  }

  render() {
    return (
      <form className="am-form am-form-inline">
        <input placeholder="Venue" id="venueInput" className="am-form-field"/>
        <span> </span>
        <button id="btnAddVenue" disabled={!this.state.venueUp} onClick={this.addVenue}
                className="am-btn am-btn-success">Add
        </button>
        <span> </span>
        <input placeholder="Trading Account" id="tradingAccountInput" className="am-form-field"/>
        <span> </span>
        <ItemAddress stream={selectedVenueStream} icon="institution" style={'success'}/>
        <span> </span>
        <ItemAddress stream={stockTickerStream} icon="line-chart"/>
      </form>
    );
  }

  /*
   <StatusIndicator healthPath={venueStream}
   pathPrefix="venues/" pathSuffix="/heartbeat"/>
   */
}
