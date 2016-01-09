/**
 * Contains the body layout and its components.
 *
 * @author zzhao
 */
'use strict';
import React from 'react'
import Container from 'amazeui-react/lib/Container'

import StatusPanel from './StatusPanel'

export default class Body extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="am-container">
        <Container><StatusPanel /></Container>
      </div>
    );
  }
}
