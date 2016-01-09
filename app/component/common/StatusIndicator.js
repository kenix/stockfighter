/**
 * Contains a bullet indicating the status of a given resource (heartbeat check):
 * up and down.
 *
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import Icon from 'amazeui-react/lib/Icon'
import Kefir from 'kefir'
import {apiStockFighter} from '../util/api'

import './common.css'

export default class StatusIndicator extends React.Component {

  static propTypes = {
    healthPath: PropTypes.object.isRequired,
    pathPrefix: PropTypes.string,
    pathSuffix: PropTypes.string
  }

  static defaultProps = {
    pathPrefix: '',
    pathSuffix: ''
  }

  constructor(props) {
    super(props);
  }

  state = {
    icon: 'warning',
    className: 'api-down'
  }

  getApiStatus = (path) => {
    const {pathPrefix, pathSuffix}=this.props;
    return apiStockFighter({
      path: pathPrefix + path + pathSuffix
    })
  }

  statusCallback = (evt) => {
    console.log('<StatusIndicator.statusCallback>', evt);
    if (evt.type === 'value') {
      this.setState({
        icon: evt.value.ok ? 'heartbeat' : 'warning',
        className: evt.value.ok ? 'api-up' : 'api-down'
      })
    } else {
      this.setState({
        icon: 'warning',
        className: 'api-down'
      })
    }
  }

  healthPathCallback = (v) => {
    this.heartbeat = Kefir.concat([
      Kefir.stream(emitter=> {
        this.getApiStatus(v)
          .then(resp=> {
            emitter.emit(resp.entity);
            emitter.end();
          })
          .catch(e=> {
            emitter.error(e);
            emitter.end();
          })
      }),
      Kefir.withInterval(10000, emitter=> {
        this.getApiStatus(v)
          .then(resp=>emitter.emit(resp.entity))
          .catch(e=>emitter.error(e))
      })
    ]);
    this.heartbeat.onAny(this.statusCallback);
  }

  componentWillMount() {
    console.log('<StatusIndicator.componentWillMount>', this.props.healthPath);
    this.healthSub = this.props.healthPath.onValue(this.healthPathCallback);
  }

  componentWillUnmount() {
    console.log('<StatusIndicator.componentWillUnmount>', this.props.healthPath);
    this.heartbeat.offAny(this.statusCallback);
    this.healthSub.offValue(this.healthPathCallback);
  }

  render() {
    return (
      <Icon icon={this.state.icon} className={this.state.className}/>
    );
  }
}