/**
 * Contains a TopBar with Brand and possibly navigation items.
 *
 * @author zzhao
 */
'use strict';
import React from 'react'
import Topbar from 'amazeui-react/lib/Topbar'

import Brand from './Brand'

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Topbar brand={<Brand />} inverse={true}/>
    );
  }
}
