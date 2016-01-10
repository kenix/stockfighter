/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Container from 'amazeui-react/lib/Container'

import StockList from './StockList'
import OrderBook from './OrderBook'
import TradePanel from './trade/TradePanel'

export default class StockPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container><StockList /></Container>
        <Container><OrderBook /></Container>
        <Container><TradePanel /></Container>
      </div>
    );
  }
}
