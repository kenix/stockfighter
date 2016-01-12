/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Icon from 'amazeui-react/lib/Icon'
import Grid from 'amazeui-react/lib/Grid'
import Col from 'amazeui-react/lib/Col'

import OrderList from './OrderList'
import BidAskSpreads from './BidAskSpreads'
import {selectedVenueStream, stockSelectionStream, apiStockFighter} from '../../../util/api'

export default class OrderBook extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    bids: [],
    asks: [],
    ts: ''
  }

  loadStatus = (loading) => {
    this.setState({loading});
  }

  loadFailed = (resp) => {
    console.log('<OrderBook.loadFailed>', resp);
    this.loadStatus(false);
  }

  loadSuccess = (orderBook) => {
    console.log('<OrderBook.loadSuccess>', orderBook);
    const {bids, asks}=orderBook;
    this.setState({
      loading: false,
      bids: bids ? bids : [],
      asks: asks ? asks : [],
      ts: orderBook.ts
    });
  }

  componentWillMount() {
    console.log('<OrderBook.componentWillMount>');
    stockSelectionStream.onValue(this.onStock);
  }

  componentWillUnmount() {
    console.log('<OrderBook.componentWillUnmount>');
    stockSelectionStream.offValue(this.onStock);
  }

  onStock = (stock) => {
    console.log('<Orderbook.onStock>', stock);
    if (!stock || !stock.ticker) {
      return;
    }
    this.loadStatus(true);
    apiStockFighter({path: `venues/${stock.venue}/stocks/${stock.ticker}`})
      .then(resp=> {
        const entity = resp.entity;
        if (entity.ok) {
          this.loadSuccess(entity);
        } else {
          this.loadFailed(resp);
        }
      }, e=> {
        this.loadFailed(e);
      })
  }

  render() {
    let {bids, asks, loading, ts}=this.state;
    if (loading) {
      return <Icon icon="spinner" spin className='am-icon-pulse'/>
    }

    const maxDepth = 5;

    if (bids.length > maxDepth) {
      bids = bids.slice(0, maxDepth);
    }
    if (asks.length > maxDepth) {
      asks = asks.slice(0, maxDepth);
    }
    const spreads = this.calcSpreads(bids, asks);

    return (
      <Grid>
        <Col sm={5}><OrderList header="Bid" orders={bids} ts={ts}/></Col>
        <Col sm={2}><BidAskSpreads header="Spread" spreads={spreads} ts={ts}/></Col>
        <Col sm={5}><OrderList header="Ask" orders={asks} ts={ts}/></Col>
      </Grid>
    );
  }

  calcSpreads = (bids, asks) => {
    if (!bids || !bids.length || !asks || !asks.length) {
      return [];
    }
    const diffs = Array.from(bids);
    diffs.fill(0);
    for (let i = 0; i < diffs.length; i++) {
      diffs[i] = (asks[0].price - bids[i].price) / asks[0].price;
    }
    return diffs;
  }
}
