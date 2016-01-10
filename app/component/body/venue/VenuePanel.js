/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Container from 'amazeui-react/lib/Container'

import VenueAdder from './VenueBar'
import VenueArea from './VenueArea'

export default class StockPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container><VenueAdder /></Container>
        <Container><VenueArea /></Container>
      </div>
    );
  }
}
