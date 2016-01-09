/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Header from './header/Header'
import Body from './body/Body'

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}