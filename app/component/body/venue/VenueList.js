/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Table from 'amazeui-react/lib/Table'

import Venue from './Venue'
import {venueStream, venueRemovedStream} from '../../util/api'

export default class VenueList extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    venues: []
  }

  onVenue = (venue) => {
    console.log('<VenueList.onVenue>', venue);
    const {venues}=this.state;
    if (!venues.find(v=>v === venue)) {
      venues.push(venue);
      this.setState({venues})
    }
  }

  onVenueRemoved = (venue) => {
    console.log('<VenueList.onVenueRemoved>', venue);
    const {venues}=this.state;
    const idx = venues.findIndex(v=>v === venue);
    if (idx >= 0) {
      this.setState({venues: venues.slice(idx, 1)})
    }
  }

  componentWillMount() {
    console.log('<VenueList.componentWillMount>');
    venueStream.onValue(this.onVenue);
    venueRemovedStream.onValue(this.onVenueRemoved);
  }

  componentWillUnmount() {
    console.log('<VenueList.componentWillUnmount>');
    venueStream.offValue(this.onVenue);
    venueRemovedStream.offValue(this.onVenueRemoved);
  }

  render() {
    const {venues}=this.state;
    return (
      <Table compact striped responsive hover>
        <thead>
        <tr>
          <th>Venue</th>
        </tr>
        </thead>
        <tbody>
        {venues.map(v=>
          <tr key={v}>
            <td><Venue key={v} venue={v}/></td>
          </tr>)}
        </tbody>
      </Table>
    );
  }
}
