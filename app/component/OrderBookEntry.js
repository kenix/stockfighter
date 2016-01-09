/**
 * @author zzhao
 */
'use strict';

import React, {PropTypes} from 'react'
import immutable from 'immutable'
import numeral from 'numeral'
import moment from 'moment'

export default class OrderBookEntry extends React.Component {

  static propTypes = {
    quote: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {quote}=this.props;

    return (
      <ul>
        <li>{`Symbol: ${quote.symbol}`}</li>
        <li>{`Bid: ${this.fmtPrice(quote.bid)}`}</li>
        <li>{`Ask: ${this.fmtPrice(quote.ask)}`}</li>
        <li>{`Last Trade: ${quote.lastTrade}`}</li>
      </ul>
    )
  }

  fmtPrice = (price)=> numeral(price).format('$ 0,0[.]00');

  fmtTs = (ts) => moment(ts, moment.ISO_8601).toISOString();
}


