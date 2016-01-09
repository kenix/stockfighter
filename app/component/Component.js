/**
 * @author zzhao
 */
'use strict';
import React from 'react';
import OrderBookEntry from './OrderBookEntry'

export default class Component extends React.Component {

  render() {
    const quote = {
      "symbol": "JEA",
      "venue": "YCWPEX",
      "bid": 3159,
      "ask": 3333,
      "bidSize": 1708,
      "askSize": 91,
      "bidDepth": 5412,
      "askDepth": 273,
      "last": 3159,
      "lastSize": 144,
      "lastTrade": "2016-01-09T15:00:08.276370432Z",
      "quoteTime": "2016-01-09T15:00:08.276441509Z"
    };

    return <div><OrderBookEntry quote={quote}/></div>
  }
}
