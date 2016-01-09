/**
 * Contains a TopBar with Brand and possibly navigation items.
 *
 * @author zzhao
 */
'use strict';
import React from 'react'
import Kefir from 'kefir'

import StatusIndicator from '../common/StatusIndicator'

export default class Brand extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p className="am-topbar-brand">
        <StatusIndicator healthPath={Kefir.constant('heartbeat')}/> <span>Stock Fighter</span>
      </p>
    );
  }
}
