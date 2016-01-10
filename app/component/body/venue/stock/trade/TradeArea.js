/**
 * @author zzhao
 */
'use strict';
import React from 'react'
import Kefir from 'kefir'
import Selected from 'amazeui-react/lib/Selected'

import {apiStockFighter, tradingAccountProp, selectedStockStream} from '../../../../util/api'

export default class TradeArea extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    tradingAccount: '',
    priceAvailable: false,
    quantityAvailable: false,
    stock: {}
  }

  componentWillMount() {
    tradingAccountProp.onValue(this.onTradingAccount);
    selectedStockStream.onValue(this.onStock);
  }

  componentWillUnmount() {
    tradingAccountProp.offValue(this.onTradingAccount);
    selectedStockStream.offValue(this.onStock);
    this.priceInputStream.offValue(this.onPrice);
    this.quantityInputStream.offValue(this.onQuantity);
  }

  componentDidMount() {
    this.priceInputStream = Kefir.fromEvents(this.price, 'input')
      .debounce(500);
    this.priceInputStream.onValue(this.onPrice);
    this.quantityInputStream = Kefir.fromEvents(this.quantity, 'input')
      .debounce(500);
    this.quantityInputStream.onValue(this.onQuantity);
  }

  onPrice = (evt) => {
    const price = this.price.value;
    this.setState({priceAvailable: !!price && !!parseInt(price)});
  }

  onQuantity = (evt) => {
    const quantity = this.quantity.value;
    this.setState({quantityAvailable: !!quantity && !!parseInt(quantity)});
  }

  onTradingAccount = (tradingAccount) => {
    this.setState({tradingAccount});
  }

  onStock = (stock) => {
    this.setState({stock});
  }

  get price() {
    return document.querySelector('#priceInput');
  }

  get quantity() {
    return document.querySelector('#quantityInput');
  }

  get orderType() {
    return document.getElementsByName('orderType')[0];
  }

  get buttonBuy() {
    return document.querySelector('#btnBuy');
  }

  get buttonSell() {
    return document.querySelector('#btnSell');
  }

  buy = (evt) => {
    evt.preventDefault();
    this.putOrder('buy');
    this.clearPriceAndQuantity();
  }

  sell = (evt) => {
    evt.preventDefault();
    this.putOrder('sell');
    this.clearPriceAndQuantity();
  }

  putOrder = (direction) => {
    const {tradingAccount, stock}=this.state;
    const entity = {
      account: tradingAccount,
      venue: stock.venue,
      stock: stock.ticker,
      price: parseInt(this.price.value),
      qty: parseInt(this.quantity.value),
      direction: direction,
      orderType: this.orderType.value
    };
    console.log('<TradeArea.putOrder>', entity);

    apiStockFighter({
      method: 'POST',
      path: `venues/${stock.venue}/stocks/${stock.ticker}/orders`,
      entity: entity,
      headers: {
        'X-Starfighter-Authorization': 'd9509cc346d39b09f50f6fad820470742cf5a781'
      }
    }).then(resp=> {
      const fb = resp.entity;
      console.log('<TradeArea.putOrder>', fb);
    }, e=> {
      console.log('<TradeArea.putOrder> failed', e);
    })
  }

  clearPriceAndQuantity = () => {
    this.price.value = '';
    this.quantity.value = '';
    this.buttonBuy.disabled = true;
    this.buttonSell.disabled = true;
    this.price.focus();
  }

  render() {
    console.log('<TradeArea.render>', this.state);
    return (
      <form className="am-form am-form-inline">
        <input placeholder="Price" id="priceInput" className="am-form-field"/>
        <span> </span>
        <input placeholder="Quantity" id="quantityInput" className="am-form-field"/>
        <span> </span>
        <Selected data={TradeArea.orderTypes} btnStyle="warning" value="limit"
                  name="orderType" btnWidth={100}/>
        <span> </span>
        <button id="btnBuy" disabled={this.anyParamUnavailable()} onClick={this.buy}
                className="am-btn am-btn-success">Buy
        </button>
        <span> </span>
        <button id="btnSell" disabled={this.anyParamUnavailable()} onClick={this.sell}
                className="am-btn am-btn-warning">Sell
        </button>
      </form>
    );
  }

  anyParamUnavailable = () => {
    const {priceAvailable, quantityAvailable, stock, tradingAccount}=this.state;
    return !(priceAvailable && quantityAvailable && !!stock.ticker && !!tradingAccount);
  }

  static orderTypes = [
    {label: 'Limit', value: 'limit'},
    {label: 'Market', value: 'market'},
    {label: 'FOK', value: 'fill-or-kill'},
    {label: 'IOC', value: 'immediate-or-cancel'}
  ]
}
