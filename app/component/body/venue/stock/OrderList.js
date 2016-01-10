/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import Table from 'amazeui-react/lib/Table'

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
    if (!orders) {
      return <span>{`No ${header}`}</span>
    }
    return (
      <Table compact striped responsive>
        <thead>
        <tr>
          <th>{header}</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order, idx)=> {
          return (<tr key={`${ts}_${idx}`}>
            {order.isBuy
              ? <td>{`${order.price}:${order.qty}`}</td>
              : <td>{`${order.qty}:${order.price}`}</td>
            }
          </tr>);
        })}
        </tbody>
      </Table>
    );
  }
}
