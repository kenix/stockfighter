/**
 * Contains the body layout and its components.
 *
 * @author zzhao
 */
'use strict';
import React from 'react'
import Container from 'amazeui-react/lib/Container'

import StockPanel from './StockPanel'

export default class Body extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="am-container">
        <Container><StockPanel /></Container>
      </div>
    );
  }
}
