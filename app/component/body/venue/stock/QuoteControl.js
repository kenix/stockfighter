/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import SockJS from 'socket.io'
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
    this.sockJS = null;
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

  onSockJSOpen = () => {
    console.log('<StockList.onSockJSOpen>');
  }

  onSockJSClose = () => {
    console.log('<StockList.onSockJSClose>');
  }

  onSockMessage = (evt) => {
    console.log('<StockList.onSockMessage>', evt);
  }

  startQuotes = (evt) => {
    const {venue} =this.props;

    this.sockJS = new SockJS(`wss://api.stockfighter.io/ob/api/ws/${currentAccount()}/venues/${venue}/tickertape`);
    this.sockJS.onopen = this.onSockJSOpen;
    this.sockJS.onmessage = this.onSockMessage;
    this.sockJS.onclose = this.onSockJSClose;
  }

  stopQuotes = (evt) => {
    if (!!this.sockJS) {
      console.log('<StockList.startQuotes> close existing sockjs client');
      this.sockJS.close();
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

  /**
   * io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
   #
   */
}
