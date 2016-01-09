/**
 * Contains API status indicators
 *
 * @author zzhao
 */
'use strict';
import React from 'react'
import Grid from 'amazeui-react/lib/Grid'
import Col from 'amazeui-react/lib/Col'

import ApiStatus from './ApiStatus'
import VenueStatus from './VenueStatus'

export default class StatusPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Col sm={1}><ApiStatus /></Col>
        <Col sm={2} end><VenueStatus /></Col>
      </Grid>
    );
  }
}
