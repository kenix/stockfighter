/**
 * Contains a TopBar with Brand and possibly navigation items.
 *
 * @author zzhao
 */
'use strict';
import React from 'react'
import Topbar from 'amazeui-react/lib/Topbar'

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Topbar brand='Stock Fighter' inverse={true}/>
    );
  }
}
