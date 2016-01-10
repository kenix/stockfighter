/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import Kefir from 'kefir'

import StatusIndicator from '../../common/StatusIndicator'
import {eventEmitter} from '../../util/api'

export default class Venue extends React.Component {

  static propTypes = {
    venue: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  selectVenue = (evt) => {
    evt.preventDefault();
    const {venue}=this.props;
    console.log('<Venue.selectVenue>', venue);
    eventEmitter.emit('selectVenue', venue);
  }

  render() {
    const {venue}=this.props;
    return (
      <span onClick={this.selectVenue}>
        <StatusIndicator healthPath={Kefir.constant(`venues/${venue}/heartbeat`)}/> {venue}
      </span>
    );
  }
}
