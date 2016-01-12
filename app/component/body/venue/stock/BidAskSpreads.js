/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Table from 'amazeui-react/lib/Table'
import numeral from 'numeral'

export default class BidAskSpreads extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('<BidAskSpreads.render>', this.props);
    const {header, spreads, ts}=this.props;
    return (
      <Table compact striped responsive>
        <thead>
        <tr>
          <th>{header}</th>
        </tr>
        </thead>
        <tbody>
        {spreads.map((spread, idx)=> {
          return (<tr key={`${ts}_${idx}`}>
            <td>{numeral(spread).format('0.000%')}</td>
          </tr>);
        })}
        </tbody>
      </Table>
    );
  }
}
