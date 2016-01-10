/**
 * @author zzhao
 */
'use strict';
import React, {PropTypes} from 'react'
import Badge from 'amazeui-react/lib/Badge'
import Icon from 'amazeui-react/lib/Icon'

export default class ItemAddress extends React.Component {

  static propTypes = {
    stream: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    style: PropTypes.string
  }

  static defaultProps = {
    style: 'secondary'
  }

  constructor(props) {
    super(props);
  }

  state = {
    item: ''
  }

  onItem = (item) => {
    this.setState({item})
  }

  componentWillMount() {
    this.props.stream.onValue(this.onItem);
  }

  componentWillUnmount() {
    this.props.stream.offValue(this.onItem);
  }

  render() {
    const {item}=this.state;
    const {icon, style}=this.props;

    return item
      ? <Badge round amStyle={style}><Icon icon={icon}/> {item}</Badge>
      : <Badge round amStyle={style}><Icon icon={icon}/></Badge>

  }
}
