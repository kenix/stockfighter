/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import Table from 'amazeui-react/lib/Table'
import Pagination from 'amazeui-react/lib/Pagination'

import {apiStockFighter} from '../util/api'

export default class StockArea extends React.Component {

  static propTypes = {
    venueStream: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    venue: '',
    stocks: []
  }

  onVenue = (venue) => {
    console.log('<StockArea.onVenue>', venue);
    apiStockFighter({
      path: `venues/${venue}/stocks`
    }).then(resp=> {
      const entity = resp.entity;
      if (entity.ok) {
        this.setState({
          venue,
          stocks: entity.symbols
        });
      } else {
        console.log('<StockArea.onVenue> failed', entity);
      }
    }).catch(e=> {
      console.log('<StockArea.onVenue> failed', e);
    })
  }

  componentWillMount() {
    console.log('<StockArea.componentWillMount>');

    this.venueSub = this.props.venueStream.onValue(this.onVenue);
  }

  componentWillUnmount() {
    console.log('<StockArea.componentWillUnmount>');
    this.venueSub.offValue(this.onVenue);
  }

  render() {
    const {venue, stocks}=this.state;
    const pagingData = {
      prevTitle: '« Prev',
      prevLink: 'prev',
      nextTitle: 'Next »',
      nextLink: 'next'
    };
    return (
      <div>
        <Table compact striped hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Ticker</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {stocks.map((stock, idx)=> {
            return <tr key={stock.symbol}>
              <td>{idx + 1}</td>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
            </tr>
          })}
          </tbody>
        </Table>
        <Pagination onSelect={this.paging} data={pagingData} theme="default"/>
      </div>
    );
  }

  paging = (link, e) => {
    e.preventDefault();
    console.log('<StockArea.pageBack> paging', link);
  }
}
