/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import Grid from 'amazeui-react/lib/Grid'
import Col from 'amazeui-react/lib/Col'

import VenueList from './VenueList'
import StockPanel from './stock/StockPanel'

export default class VenueArea extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Col sm={2}><VenueList /></Col>
        <Col sm={10}><StockPanel /></Col>
      </Grid>
    );
  }
}
