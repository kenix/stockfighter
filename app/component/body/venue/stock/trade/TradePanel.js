/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Container from 'amazeui-react/lib/Container'

import TradeArea from './TradeArea'
import Orders from './Orders'

export default class TradePanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container><TradeArea/></Container>
        <Container><Orders/></Container>
      </div>
    );
  }
}
