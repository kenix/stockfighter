/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Table from 'amazeui-react/lib/Table'
import Icon from 'amazeui-react/lib/Icon'
import Badge from 'amazeui-react/lib/Badge'

import QuoteControl from './QuoteControl'
import StockQuote from './StockQuote'
import {eventEmitter, selectedVenueStream, apiStockFighter} from '../../../util/api'

export default class StockList extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    venue: '',
    loading: false,
    stocks: []
  }

  componentWillMount() {
    console.log('<StockList.componentWillMount>');
    selectedVenueStream.onValue(this.onVenue);
  }

  componentWillUnmount() {
    console.log('<StockList.componentWillUnmount>');
    selectedVenueStream.offValue(this.onVenue);
  }

  loadStatus = (loading) => {
    this.setState({loading});
  }

  onVenue = (venue) => {
    console.log('<StockList.onVenue>', venue);
    this.loadStatus(true);
    apiStockFighter({path: `venues/${venue}/stocks`})
      .then(resp => {
        const entity = resp.entity;
        if (entity.ok) {
          this.setState({loading: false, stocks: entity.symbols, venue});
        } else {
          this.loadFailed(resp);
        }
      }).catch(e => {
      this.loadFailed(e);
    })
  }

  loadFailed = (resp) => {
    console.log('<StockList.loadFailed>', resp);
    this.setState({loading: false, stocks: [], venue: ''});
  }

  selectStock = (evt) => {
    const stock = {venue: this.state.venue, ticker: this.getTicker(evt.target)};
    console.log('<StockList.selectStock>', stock);
    eventEmitter.emit('selectStock', stock);
  }

  getTicker = (el) => {
    while (el && !el.dataset.ticker) {
      el = el.parentElement;
    }
    return el ? el.dataset.ticker : '';
  }

  render() {
    const {stocks, loading, venue}=this.state;
    if (loading) {
      return <Icon icon="spinner" spin className='am-icon-pulse'/>
    }

    return (
      <div>
        <Table compact striped responsive hover>
          <thead>
          <tr>
            <th style={{width: '20%'}}>Ticker</th>
            <th style={{width: '20%'}}>Bid</th>
            <th style={{width: '20%'}}>Trade</th>
            <th style={{width: '20%'}}>Ask</th>
            <th style={{width: '20%'}}>TS</th>
          </tr>
          </thead>
          <tbody onClick={this.selectStock}>
          {stocks.map((s)=> {
            return (
              <StockQuote key={s.symbol} stock={s}/>
            );
          })}
          </tbody>
        </Table>
        <QuoteControl venue={venue}/>
      </div>
    );
  }
}
