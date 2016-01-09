/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Kefir from 'kefir'

import StatusIndicator from '../common/StatusIndicator'

export default class ApiStatus extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>
          <span>API: </span><StatusIndicator healthPath={Kefir.constant('heartbeat')}/>
        </p>
      </div>
    );
  }
}
