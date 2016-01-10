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