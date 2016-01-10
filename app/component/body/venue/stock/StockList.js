/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Table from 'amazeui-react/lib/Table'
import Icon from 'amazeui-react/lib/Icon'
import Badge from 'amazeui-react/lib/Badge'

import {eventEmitter, selectedVenueStream, apiStockFighter} from '../../../util/api'

export default class StockList extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
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
    this.venue = venue;
    this.loadStatus(true);
    apiStockFighter({path: `venues/${venue}/stocks`})
      .then(resp => {
        const entity = resp.entity;
        if (entity.ok) {
          this.setState({loading: false, stocks: entity.symbols});
        } else {
          this.loadFailed(resp);
        }
      }).catch(e => {
      this.loadFailed(e);
    })
  }

  loadFailed = (resp) => {
    console.log('<StockList.loadFailed>', resp);
    this.loadStatus(false);
  }

  selectStock = (evt) => {
    const stock = {venue: this.venue, ticker: this.getTicker(evt.target)};
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
    const {stocks, loading}=this.state;
    if (loading) {
      return <Icon icon="spinner" spin pulse/>
    }

    return (
      <Table compact striped responsive hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Ticker</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody onClick={this.selectStock}>
        {stocks.map((s, idx)=> {
          return (
            <tr key={s.symbol} data-ticker={s.symbol}>
              <td>{idx + 1}</td>
              <td>{s.symbol}</td>
              <td>{s.name}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    );
  }
}
