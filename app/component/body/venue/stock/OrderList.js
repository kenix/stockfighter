/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import Table from 'amazeui-react/lib/Table'
import Progress from 'amazeui-react/lib/Progress'
import numeral from 'numeral'

export default class OrderList extends React.Component {

  static propTypes = {
    header: PropTypes.any.isRequired,
    orders: PropTypes.array.isRequired,
    ts: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {header, orders, ts}=this.props;
    if (!orders || !orders.length) {
      return <span>{`No ${header}`}</span>
    }

    const totalVolume = orders.reduce((pre, cur)=>pre + cur.qty, 0);
    const isBuy = orders[0].isBuy;

    return (
      <Table compact striped responsive>
        <thead>
        <tr>
          <th style={{width: isBuy?'80':'10'}}>{isBuy ? '' : header}</th>
          <th style={{width: '10'}}>{'Size'}</th>
          <th style={{width: isBuy?'10':'80'}}>{isBuy ? header : ''}</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order, idx)=> {
          return isBuy
            ? (<tr key={`${ts}_${idx}`}>
            <td>{numeral(order.qty / totalVolume).format('0.000%')}</td>
            <td>{order.qty}</td>
            <td>{order.price}</td>
          </tr>)
            : (<tr key={`${ts}_${idx}`}>
            <td>{order.qty}</td>
            <td>{order.price}</td>
            <td>{numeral(order.qty / totalVolume).format('0.000%')}</td>
          </tr>);
        })}
        </tbody>
      </Table>
    );
  }
}
