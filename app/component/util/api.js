/**
 * Contains api stubs.
 *
 * @author zzhao
 */
'use strict';
import rest from 'rest'
import timeout from 'rest/interceptor/timeout'
import mime from 'rest/interceptor/mime'
import errorCode from 'rest/interceptor/errorCode'
import pathPrefix from 'rest/interceptor/pathPrefix'
import defaultRequest from 'rest/interceptor/defaultRequest'
import Kefir from 'kefir'
import EventEmitter from 'eventemitter3'

export const apiStockFighter =
  rest
    .wrap(timeout, {timeout: 5000})
    .wrap(mime)
    .wrap(errorCode, {code: 400})
    .wrap(pathPrefix, {prefix: 'https://api.stockfighter.io/ob/api/'})
    .wrap(defaultRequest, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

export const eventEmitter = new EventEmitter();
export const venueStream = Kefir.fromEvents(eventEmitter, 'venue');
export const tradingAccountProp = Kefir
  .fromEvents(eventEmitter, 'tradingAccount')
  .skipDuplicates()
  .toProperty(()=>'');
export const venueRemovedStream = Kefir.fromEvents(eventEmitter, 'removeVenue');
export const selectedVenueStream = Kefir.fromEvents(eventEmitter, 'selectVenue').skipDuplicates();
export const selectedStockStream = Kefir.merge([
  Kefir.fromEvents(eventEmitter, 'selectStock').skipDuplicates((s1, s2)=> {
    return s1.venue === s2.venue && s1.ticker == s2.ticker;
  }),
  selectedVenueStream.map(v=> {
    return {venue: v, ticker: ''}
  })
]);
export const stockTickerStream = selectedStockStream.map(stock=>stock.ticker).skipDuplicates();