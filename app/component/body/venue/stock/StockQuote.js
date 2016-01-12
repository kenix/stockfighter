/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Kefir from 'kefir'
import moment from 'moment'

import {eventEmitter, quoteStream} from '../../../util/api'

export default class StockQuote extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    quote: null
  }

  componentWillMount() {
    console.log('<StockQuote.componentWillMount>');
    const {stock}=this.props;
    this.quoting = quoteStream.filter(q=>q.symbol === stock.symbol);
    this.quoting.onValue(this.onQuote);
  }

  componentWillUnmount() {
    console.log('<StockQuote.componentWillUnmount>');
    this.quoting.offValue(this.onQuote);
  }

  onQuote = (quote) => {
    this.setState({quote});
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
    const {stock}=this.props;
    const {quote}=this.state;
    return (
      <tr data-ticker={stock.symbol}>
        <td title={stock.name}>{stock.symbol}</td>
        <td>{quote ? this.renderTick(quote.bid, quote.bidSize, quote.bidDepth) : 'n/a'}</td>
        <td>{quote ? this.renderTick(quote.last, quote.lastSize) : 'n/a'}</td>
        <td>{quote ? this.renderTick(quote.ask, quote.askSize, quote.askDepth) : 'n/a'}</td>
        <td>{quote && quote.lastTrade ? moment(quote.lastTrade).format('HH:MM:ss') : 'n/a'}</td>
      </tr>
    );
  }

  renderTick = (tick, size, depth = 0) => {
    if (!tick) {
      return 'n/a';
    }
    return !depth
      ? <span>{tick}<br/><small>{`(${size})`}</small></span>
      : <span>{tick}<br/><small>{`(${size} / ${depth})`}</small></span>
  }
}
