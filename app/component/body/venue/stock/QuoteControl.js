/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import ButtonToolbar from 'amazeui-react/lib/ButtonToolbar'
import ButtonGroup from 'amazeui-react/lib/ButtonGroup'
import Button from 'amazeui-react/lib/Button'
import Icon from 'amazeui-react/lib/Icon'

import {eventEmitter, currentAccount} from '../../../util/api'

export default class QuoteControl extends React.Component {

  static propTypes = {
    venue: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.socket = null;
  }

  state = {
    playing: false
  }

  componentWillReceiveProps(nextProps) {
    this.stopQuotes(null);
  }

  componentWillUnmount() {
    this.stopQuotes(null);
  }

  onSocketOpen = () => {
    console.log('<QuoteControl.onSocketOpen>');
    this.setState({playing: true});
  }

  onSocketClose = () => {
    console.log('<QuoteControl.onSocketClose>');
  }

  onSocketMessage = (evt) => {
    console.log('<QuoteControl.onSocketMessage>', evt.data);
  }

  onSockError = (err) => {
    console.log('<QuoteControl.onSockError>');
  }

  startQuotes = (evt) => {
    const {venue} =this.props;

    this.socket = new WebSocket(`wss://api.stockfighter.io/ob/api/ws/${currentAccount()}/venues/${venue}/tickertape`);
    this.socket.onopen = this.onSocketOpen;
    this.socket.onmessage = this.onSocketMessage;
  }

  stopQuotes = (evt) => {
    if (!!this.socket) {
      console.log('<QuoteControl.startQuotes> close existing websocket client');
      this.socket.close();
      this.socket = null;
    }
    this.setState({playing: false});
  }

  render() {
    const {playing}=this.state;
    const {venue} =this.props;
    const curAccount = currentAccount();
    const startable = !playing && venue && curAccount;
    const stopable = playing && venue && curAccount;

    return (
      <ButtonToolbar>
        <ButtonGroup>
          <Button amStyle="success" amSize="xs" disabled={!startable} onClick={this.startQuotes}>
            <Icon icon="play"/>
          </Button>
          <Button amStyle="danger" amSize="xs" disabled={!stopable} onClick={this.stopQuotes}>
            <Icon icon="stop"/>
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}
